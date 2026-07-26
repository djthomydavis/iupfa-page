-- Cybersecurity Students IUPFA — esquema inicial de Supabase (fase 1: auth + curriculum + progreso por alumno)
-- Corré este script una sola vez en Supabase → SQL Editor → New query → Run.

create extension if not exists "pgcrypto";

-- =========================================================
-- PROFILES (metadata de cada usuario: nombre, avatar, rol)
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  avatar text not null default 'U',
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now()
);

-- Verificación de correo por código (en vez del link de confirmación de Supabase)
alter table public.profiles add column if not exists email_verified boolean not null default false;
alter table public.profiles add column if not exists verification_code text;
alter table public.profiles add column if not exists verification_expires timestamptz;
alter table public.profiles add column if not exists banned boolean not null default false;
alter table public.profiles add column if not exists password_reset_code text;
alter table public.profiles add column if not exists password_reset_expires timestamptz;

-- Perfil de usuario: foto, preferencia de mensajes y datos adicionales opcionales
-- (extra_info guarda { address, address_visible, dni, dni_visible,
-- join_date, join_date_visible, current_subjects_visible }).
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists allow_messages boolean not null default false;
alter table public.profiles add column if not exists extra_info jsonb not null default '{}'::jsonb;

-- Datos principales (nombre, apellido y fecha de nacimiento son siempre
-- públicos para otros alumnos, sin toggle de visibilidad).
alter table public.profiles add column if not exists last_name text;
alter table public.profiles add column if not exists birth_date date;

-- Contacto (teléfono, Instagram, LinkedIn) con un único toggle de visibilidad
-- que controla los tres a la vez. Reemplaza a whatsapp_number/whatsapp_enabled.
-- "cascade" porque la vista student_directory (redefinida más abajo) puede
-- depender todavía de estas columnas si ya corriste una versión anterior de
-- este script; al recrearse la vista más abajo con "create or replace" no
-- hay pérdida real, solo evita que este drop falle por la dependencia.
alter table public.profiles drop column if exists whatsapp_number cascade;
alter table public.profiles drop column if exists whatsapp_enabled cascade;
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists instagram text;
alter table public.profiles add column if not exists linkedin text;
alter table public.profiles add column if not exists contact_visible boolean not null default false;

alter table public.profiles enable row level security;

-- Chequeo de "¿el usuario logueado es admin?" como función security definer:
-- evita la recursión infinita que da Postgres cuando una policy de "profiles"
-- consulta "profiles" dentro de sí misma (el error típico es "infinite
-- recursion detected in policy for relation profiles"). Al ser security
-- definer, esta función lee la tabla evadiendo RLS, así que la policy que la
-- usa no vuelve a disparar su propia evaluación.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$;

-- IMPORTANTE (endurecido): antes cualquier usuario autenticado podía leer la fila
-- COMPLETA de cualquier otro perfil (incluyendo DNI, dirección, códigos de
-- verificación, etc.) porque esta policy usaba "using (true)". Ahora solo el
-- propio dueño del perfil o un admin pueden leer la fila completa; el
-- directorio de "Alumnos" usa las vistas de abajo (student_directory /
-- student_current_subjects), que exponen únicamente lo que cada usuario marcó
-- como visible.
drop policy if exists "Profiles are viewable by authenticated users" on public.profiles;
drop policy if exists "Users can view own profile or admins view all" on public.profiles;
create policy "Users can view own profile or admins view all"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Permite que un admin cambie el rol de cualquier usuario desde el panel de Usuarios
drop policy if exists "Admins can update any profile" on public.profiles;
create policy "Admins can update any profile"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Crea automáticamente el perfil cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 1)),
    'student'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- SUBJECTS (curriculum compartido, solo lo edita un admin)
-- =========================================================
create table if not exists public.subjects (
  id text primary key,
  code text not null unique,
  name text not null,
  year int not null,
  semester text not null,
  hours text not null,
  modality text not null,
  libre text not null,
  exam_final text not null,
  correlatives text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.subjects enable row level security;

drop policy if exists "Subjects are viewable by authenticated users" on public.subjects;
create policy "Subjects are viewable by authenticated users"
  on public.subjects for select to authenticated using (true);

drop policy if exists "Only admins can modify subjects" on public.subjects;
create policy "Only admins can modify subjects"
  on public.subjects for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- STUDENT_PROGRESS (estado + notas, propio de cada alumno)
-- =========================================================
create table if not exists public.student_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  status text not null default 'No cursable',
  grades jsonb not null default '{"tp1":"","tp2":"","tp3":"","parcial":"","final":"","notaFinal":""}',
  updated_at timestamptz not null default now(),
  primary key (user_id, subject_id)
);

alter table public.student_progress enable row level security;

drop policy if exists "Users manage their own progress" on public.student_progress;
create policy "Users manage their own progress"
  on public.student_progress for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =========================================================
-- DIRECTORIO DE ALUMNOS: vistas de solo lectura que exponen
-- únicamente los datos que cada alumno marcó como visibles
-- (sección "Alumnos" del portal). Al ser vistas creadas por el
-- dueño de la base (que evade RLS), pueden leer profiles/student_progress
-- completos por dentro pero solo devuelven, columna por columna, lo que la
-- lógica de abajo decide exponer — la RLS de las tablas base sigue
-- restringida a "uno mismo o admin".
-- =========================================================
create or replace view public.student_directory as
select
  id,
  name,
  last_name,
  birth_date,
  avatar,
  avatar_url,
  allow_messages,
  case when contact_visible then phone else null end as phone,
  case when contact_visible then instagram else null end as instagram,
  case when contact_visible then linkedin else null end as linkedin,
  contact_visible,
  case when coalesce((extra_info->>'address_visible')::boolean, false) then extra_info->>'address' else null end as address,
  case when coalesce((extra_info->>'dni_visible')::boolean, false) then extra_info->>'dni' else null end as dni,
  case when coalesce((extra_info->>'join_date_visible')::boolean, false) then extra_info->>'join_date' else null end as join_date,
  coalesce((extra_info->>'current_subjects_visible')::boolean, false) as current_subjects_visible
from public.profiles
where role = 'student' and email_verified = true;

grant select on public.student_directory to authenticated;

create or replace view public.student_current_subjects as
select sp.user_id, s.id as subject_id, s.code, s.name
from public.student_progress sp
join public.subjects s on s.id = sp.subject_id
join public.profiles p on p.id = sp.user_id
where sp.status = 'Cursando'
  and coalesce((p.extra_info->>'current_subjects_visible')::boolean, false) = true;

grant select on public.student_current_subjects to authenticated;

-- =========================================================
-- MENSAJES entre alumnos (solo si el destinatario lo permite
-- desde su perfil: "Permitir que otros usuarios me envíen mensajes")
-- =========================================================
create or replace function public.user_allows_messages(target uuid)
returns boolean
language sql
security definer set search_path = public
as $$
  select coalesce(allow_messages, false) from public.profiles where id = target;
$$;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

alter table public.messages enable row level security;

drop policy if exists "Users can view their own messages" on public.messages;
create policy "Users can view their own messages"
  on public.messages for select
  to authenticated
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

drop policy if exists "Users can send messages to users who allow it" on public.messages;
create policy "Users can send messages to users who allow it"
  on public.messages for insert
  to authenticated
  with check (auth.uid() = sender_id and public.user_allows_messages(receiver_id));

drop policy if exists "Receiver can mark messages as read" on public.messages;
create policy "Receiver can mark messages as read"
  on public.messages for update
  to authenticated
  using (auth.uid() = receiver_id)
  with check (auth.uid() = receiver_id);

-- =========================================================
-- SEED: curriculum completo (39 materias)
-- =========================================================
insert into public.subjects (id, code, name, year, semester, hours, modality, libre, exam_final, correlatives) values
('mat1','1','Informática I',1,'1','64 hs','Presencial','Libre','Con examen final','{}'),
('mat2','2','Aspectos Constitucionales y Derechos Humanos',1,'1','48 hs','A Distancia','Libre','Sin examen final','{}'),
('mat3','3','Elementos del Derecho Penal y Garantías Fundamentales',1,'1','48 hs','A Distancia','Libre','Sin examen final','{}'),
('mat4','4','Redes de Área Local y Extendida',1,'1','64 hs','A Distancia','No libre','Con examen final','{}'),
('mat5','5','Matemática Aplicada',1,'1','64 hs','Presencial','No libre','Con examen final','{}'),
('mat6','6','Introducción a la Ciberdefensa, Ciberdelito y Ciberinteligencia',1,'1','48 hs','A Distancia','No libre','Sin examen final','{}'),
('mat7','7','Informática II',1,'2','64 hs','Presencial','Libre','Con examen final','{mat1}'),
('mat8','8','Teleinformática',1,'2','64 hs','A Distancia','Libre','Con examen final','{}'),
('mat9','9','Elementos del Derecho Procesal Penal y Garantías en el Proceso',1,'2','48 hs','A Distancia','Libre','Sin examen final','{mat3}'),
('mat10','10','Legislación Penal Aplicada',1,'2','48 hs','A Distancia','Libre','Sin examen final','{}'),
('mat11','11','Introducción a la Programación',2,'1','64 hs','Presencial','Libre','Con examen final','{mat5}'),
('mat12','12','Seguridad Informática',2,'1','80 hs','Presencial','No libre','Con examen final','{mat8}'),
('mat13','13','Seguridad en Internet',2,'1','48 hs','A Distancia','No libre','Con examen final','{mat9}'),
('mat14','14','Estadística Aplicada',2,'1','64 hs','Presencial','Libre','Sin examen final','{mat5}'),
('mat15','15','Criptoactivos y Blockchain',2,'1','48 hs','A Distancia','No libre','Con examen final','{mat5}'),
('mat16','16','Informática Forense I',2,'2','64 hs','Presencial','No libre','Con examen final','{mat8,mat9}'),
('mat17','17','Prevención, Conjuración e Investigación de Delitos en Tecnología',2,'2','80 hs','A Distancia','Libre','Sin examen final','{mat10}'),
('mat18','18','Evidencia Digital',2,'2','80 hs','Presencial','No libre','Con examen final','{mat5,mat8}'),
('mat19','19','Tecnologías Aplicadas',2,'2','64 hs','A Distancia','No libre','Con examen final','{mat4,mat10}'),
('mat20','20','Investigación con Fuentes Abiertas',2,'2','64 hs','A Distancia','No libre','Con examen final','{mat12}'),
('mat21','21','Informática Forense II',3,'1','64 hs','Presencial','No libre','Con examen final','{mat16}'),
('mat22','22','Metodología de la Investigación Científica y Tecnología',3,'1','64 hs','Presencial','Libre','Sin examen final','{mat14}'),
('mat23','23','Seguridad en Redes Informáticas',3,'1','64 hs','A Distancia','No libre','Con examen final','{mat12,mat13}'),
('mat24','24','Ciberseguridad en Tecnologías de Operación',3,'1','64 hs','Presencial','No libre','Con examen final','{mat19}'),
('mat25','25','Seguridad Física',3,'1','64 hs','Presencial','No libre','Sin examen final','{mat17}'),
('mat26','26','Lenguajes, Estructuras y Algoritmos de Programación',3,'2','80 hs','Presencial','No libre','Con examen final','{mat11}'),
('mat27','27','Criptografía I',3,'2','64 hs','Presencial','No libre','Con examen final','{mat23}'),
('mat28','28','Legislación y Normativa Vigente en Ciberseguridad',3,'2','48 hs','A Distancia','Libre','Sin examen final','{mat10}'),
('mat29','29','Ética Aplicada a la Ciberseguridad',3,'2','48 hs','A Distancia','Libre','Sin examen final','{mat20}'),
('mat30','30','Gestión de la Seguridad Informática I',3,'2','80 hs','Presencial','No libre','Con examen final','{mat12}'),
('mat31','31','Seguridad en Sistemas Operativos y Bases de Datos',4,'1','64 hs','Presencial','No libre','Con examen final','{mat26}'),
('mat32','32','Evaluación y Gestión de Proyectos en Seguridad Pública',4,'1','64 hs','Presencial','No libre','Con examen final','{mat22}'),
('mat33','33','Cooperación Internacional en Cibercrimen y Ciberseguridad',4,'1','48 hs','A Distancia','Libre','Sin examen final','{mat21}'),
('mat34','34','Criptografía II',4,'1','80 hs','Presencial','No libre','Con examen final','{mat27}'),
('mat35','35','Inteligencia Artificial Aplicada',4,'1','64 hs','Presencial','No libre','Sin examen final','{mat26}'),
('mat36','36','Auditorías Informáticas',4,'2','80 hs','Presencial','No libre','Sin examen final','{mat30}'),
('mat37','37','Continuidad de las Operaciones e Infraestructuras Críticas',4,'2','96 hs','Presencial','No libre','Con examen final','{mat24}'),
('mat38','38','Gestión de la Seguridad Informática II',4,'2','80 hs','Presencial','No libre','Con examen final','{mat30}'),
('mat39','39','Práctica Profesionalizante',4,'2','64 hs','Presencial','No libre','Con examen final','{mat32}')
on conflict (id) do nothing;

-- =========================================================
-- STORAGE: bucket público para los PDFs de contenido de materias
-- (antes se guardaban como base64 en localStorage y llenaban el
-- almacenamiento del navegador; ahora se suben acá).
-- =========================================================
insert into storage.buckets (id, name, public)
values ('subject-content', 'subject-content', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated can view subject-content" on storage.objects;
create policy "Authenticated can view subject-content"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'subject-content');

drop policy if exists "Admins can upload subject-content" on storage.objects;
create policy "Admins can upload subject-content"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'subject-content' and public.is_admin());

drop policy if exists "Admins can delete subject-content" on storage.objects;
create policy "Admins can delete subject-content"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'subject-content' and public.is_admin());

-- =========================================================
-- STORAGE: bucket público para las fotos de perfil de cada usuario
-- (cada usuario solo puede subir/editar/borrar dentro de su propia
-- carpeta, nombrada con su user id).
-- =========================================================
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can view avatars" on storage.objects;
create policy "Anyone can view avatars"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'avatars');

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- =========================================================
-- IMPORTANTE: convertí tu usuario admin manualmente después de registrarte
-- =========================================================
-- 1) Registrate en la app con tu correo real (queda como 'student' por defecto).
-- 2) Confirmá el mail con el código de 6 dígitos que te llega por EmailJS.
-- 3) Corré esto reemplazando el correo para volverte admin:
--    update public.profiles set role = 'admin' where email = 'tu-correo@dominio.com';

-- =========================================================
-- IMPORTANTE: desactivá la confirmación por link de Supabase
-- =========================================================
-- Como ahora confirmamos el correo nosotros mismos con un código
-- (vía EmailJS), Supabase no debe exigir su propio link de confirmación,
-- porque si no el usuario no queda logueado (con sesión activa) recién
-- registrado y no podríamos guardarle ni enviarle el código.
-- Andá a: Authentication -> Providers -> Email -> desactivá "Confirm email".
