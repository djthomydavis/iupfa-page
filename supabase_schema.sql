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

-- Perfil de usuario: foto y datos adicionales opcionales
-- (extra_info guarda { address, address_visible, dni, dni_visible,
-- join_date, join_date_visible, current_subjects_visible }).
alter table public.profiles add column if not exists avatar_url text;
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
-- CREATE OR REPLACE VIEW no permite sacar columnas (solo agregar al final),
-- así que si esta vista ya existía con más columnas (ej. allow_messages, que
-- se dio de baja) hay que borrarla y recrearla en vez de reemplazarla.
drop view if exists public.student_directory;
create view public.student_directory as
select
  id,
  name,
  last_name,
  birth_date,
  avatar,
  avatar_url,
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
-- La mensajería directa entre alumnos se dio de baja: se borra la tabla,
-- la función de permiso y la columna que la habilitaba.
-- =========================================================
drop table if exists public.messages cascade;
drop function if exists public.user_allows_messages(uuid) cascade;
alter table public.profiles drop column if exists allow_messages cascade;

-- =========================================================
-- FORO GENERAL (antes vivía en localStorage; ahora es un dato real y
-- compartido, igual que el calendario).
-- =========================================================
create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.forum_posts enable row level security;

drop policy if exists "Forum posts are viewable by authenticated users" on public.forum_posts;
create policy "Forum posts are viewable by authenticated users"
  on public.forum_posts for select to authenticated using (true);

drop policy if exists "Users can create their own forum posts" on public.forum_posts;
create policy "Users can create their own forum posts"
  on public.forum_posts for insert to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Admins can update forum posts" on public.forum_posts;
create policy "Admins can update forum posts"
  on public.forum_posts for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete forum posts" on public.forum_posts;
create policy "Admins can delete forum posts"
  on public.forum_posts for delete to authenticated
  using (public.is_admin());

-- =========================================================
-- PREGUNTAS FRECUENTES: las carga un admin desde admin.html, se muestran
-- en el portal ordenadas por "position" (menor primero).
-- =========================================================
create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.faq_items enable row level security;

drop policy if exists "Faq items are viewable by authenticated users" on public.faq_items;
create policy "Faq items are viewable by authenticated users"
  on public.faq_items for select to authenticated using (true);

drop policy if exists "Only admins can modify faq items" on public.faq_items;
create policy "Only admins can modify faq items"
  on public.faq_items for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- =========================================================
-- CONTENIDO DE MATERIAS: unidades + items (PDF/clase). Solo un admin
-- puede escribir; todos los autenticados pueden leer.
-- =========================================================
create table if not exists public.subject_units (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

alter table public.subject_units enable row level security;

drop policy if exists "Subject units are viewable by authenticated users" on public.subject_units;
create policy "Subject units are viewable by authenticated users"
  on public.subject_units for select to authenticated using (true);

drop policy if exists "Only admins can modify subject units" on public.subject_units;
create policy "Only admins can modify subject units"
  on public.subject_units for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table if not exists public.subject_content_items (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.subject_units(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  type text not null check (type in ('pdf','clase')),
  title text not null,
  file_name text,
  url text,
  storage_path text,
  body text,
  uploaded_by text,
  created_at timestamptz not null default now()
);

alter table public.subject_content_items enable row level security;

drop policy if exists "Subject content is viewable by authenticated users" on public.subject_content_items;
create policy "Subject content is viewable by authenticated users"
  on public.subject_content_items for select to authenticated using (true);

drop policy if exists "Only admins can modify subject content" on public.subject_content_items;
create policy "Only admins can modify subject content"
  on public.subject_content_items for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- =========================================================
-- FORO DE CADA MATERIA (distinto del foro general)
-- =========================================================
create table if not exists public.subject_forum_posts (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.subject_forum_posts enable row level security;

drop policy if exists "Subject forum posts are viewable by authenticated users" on public.subject_forum_posts;
create policy "Subject forum posts are viewable by authenticated users"
  on public.subject_forum_posts for select to authenticated using (true);

drop policy if exists "Users can create their own subject forum posts" on public.subject_forum_posts;
create policy "Users can create their own subject forum posts"
  on public.subject_forum_posts for insert to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Admins can delete subject forum posts" on public.subject_forum_posts;
create policy "Admins can delete subject forum posts"
  on public.subject_forum_posts for delete to authenticated
  using (public.is_admin());

-- =========================================================
-- OPINIONES sobre profesores, por materia
-- =========================================================
create table if not exists public.subject_opinions (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  professor text not null,
  rating int not null check (rating between 1 and 5),
  content text,
  created_at timestamptz not null default now()
);

alter table public.subject_opinions enable row level security;

drop policy if exists "Subject opinions are viewable by authenticated users" on public.subject_opinions;
create policy "Subject opinions are viewable by authenticated users"
  on public.subject_opinions for select to authenticated using (true);

drop policy if exists "Users can create their own opinions" on public.subject_opinions;
create policy "Users can create their own opinions"
  on public.subject_opinions for insert to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Admins can delete opinions" on public.subject_opinions;
create policy "Admins can delete opinions"
  on public.subject_opinions for delete to authenticated
  using (public.is_admin());

-- =========================================================
-- ENCUESTAS por materia (cualquier alumno puede crear una y votar;
-- un voto por alumno por encuesta, votar de nuevo cambia el voto).
-- =========================================================
create table if not exists public.subject_polls (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects(id) on delete cascade,
  created_by_id uuid references auth.users(id) on delete set null,
  created_by_name text not null,
  question text not null,
  created_at timestamptz not null default now()
);

alter table public.subject_polls enable row level security;

drop policy if exists "Subject polls are viewable by authenticated users" on public.subject_polls;
create policy "Subject polls are viewable by authenticated users"
  on public.subject_polls for select to authenticated using (true);

drop policy if exists "Users can create their own polls" on public.subject_polls;
create policy "Users can create their own polls"
  on public.subject_polls for insert to authenticated
  with check (auth.uid() = created_by_id);

drop policy if exists "Admins can delete polls" on public.subject_polls;
create policy "Admins can delete polls"
  on public.subject_polls for delete to authenticated
  using (public.is_admin());

create table if not exists public.subject_poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.subject_polls(id) on delete cascade,
  label text not null,
  position int not null default 0
);

alter table public.subject_poll_options enable row level security;

drop policy if exists "Subject poll options are viewable by authenticated users" on public.subject_poll_options;
create policy "Subject poll options are viewable by authenticated users"
  on public.subject_poll_options for select to authenticated using (true);

drop policy if exists "Users can add options to their own polls" on public.subject_poll_options;
create policy "Users can add options to their own polls"
  on public.subject_poll_options for insert to authenticated
  with check (exists (
    select 1 from public.subject_polls p
    where p.id = poll_id and p.created_by_id = auth.uid()
  ));

drop policy if exists "Admins can delete poll options" on public.subject_poll_options;
create policy "Admins can delete poll options"
  on public.subject_poll_options for delete to authenticated
  using (public.is_admin());

create table if not exists public.subject_poll_votes (
  poll_id uuid not null references public.subject_polls(id) on delete cascade,
  option_id uuid not null references public.subject_poll_options(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  voted_at timestamptz not null default now(),
  primary key (poll_id, user_id)
);

alter table public.subject_poll_votes enable row level security;

drop policy if exists "Votes are viewable by authenticated users" on public.subject_poll_votes;
create policy "Votes are viewable by authenticated users"
  on public.subject_poll_votes for select to authenticated using (true);

drop policy if exists "Users manage their own vote" on public.subject_poll_votes;
create policy "Users manage their own vote"
  on public.subject_poll_votes for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

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

-- Los resúmenes de alumnos se guardan en el mismo bucket, en la carpeta
-- summaries/<subject_id>/<user_id>/<archivo>, para poder validar el dueño
-- por path sin tocar las políticas de admin de arriba (se combinan con OR).
drop policy if exists "Students can upload their own summaries" on storage.objects;
create policy "Students can upload their own summaries"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'subject-content'
    and (storage.foldername(name))[1] = 'summaries'
    and (storage.foldername(name))[3] = auth.uid()::text
  );

drop policy if exists "Owner or admin can delete summaries" on storage.objects;
create policy "Owner or admin can delete summaries"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'subject-content'
    and (storage.foldername(name))[1] = 'summaries'
    and ((storage.foldername(name))[3] = auth.uid()::text or public.is_admin())
  );

-- =========================================================
-- RESÚMENES: PDFs que suben los propios alumnos por materia
-- =========================================================
create table if not exists public.subject_summaries (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  author_name text not null,
  title text not null,
  file_name text,
  url text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table public.subject_summaries enable row level security;

drop policy if exists "Authenticated can view subject summaries" on public.subject_summaries;
create policy "Authenticated can view subject summaries"
  on public.subject_summaries for select
  to authenticated
  using (true);

drop policy if exists "Students can upload their own summaries" on public.subject_summaries;
create policy "Students can upload their own summaries"
  on public.subject_summaries for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Owner or admin can delete summaries" on public.subject_summaries;
create policy "Owner or admin can delete summaries"
  on public.subject_summaries for delete
  to authenticated
  using (auth.uid() = author_id or public.is_admin());

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
-- CALENDAR_EVENTS (antes vivía solo en localStorage de cada navegador;
-- se migra acá para que sea un dato real y compartido — entre otras cosas,
-- para que el bot de Discord pueda leerlo y mandar recordatorios).
-- =========================================================
create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'Académico'
    check (type in ('Académico','Examen','Inscripción','Feriado','Entrega','Cuatrimestre')),
  date date not null,
  end_date date,
  start_time time,
  end_time time,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.calendar_events enable row level security;

drop policy if exists "Calendar events are viewable by authenticated users" on public.calendar_events;
create policy "Calendar events are viewable by authenticated users"
  on public.calendar_events for select to authenticated using (true);

drop policy if exists "Only admins can modify calendar events" on public.calendar_events;
create policy "Only admins can modify calendar events"
  on public.calendar_events for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Eventos de una materia en particular (ej. "Examen" con su materia), y
-- clases recurrentes generadas para el cuatrimestre activo: subject_id linkea
-- la materia, modality distingue Presencial/Virtual, series_id agrupa todas
-- las clases generadas por una misma corrida del generador (para poder
-- borrarlas todas juntas si hace falta).
alter table public.calendar_events drop constraint if exists calendar_events_type_check;
alter table public.calendar_events add constraint calendar_events_type_check
  check (type in ('Académico','Examen','Inscripción','Feriado','Entrega','Cuatrimestre','Clase'));
alter table public.calendar_events add column if not exists subject_id text references public.subjects(id) on delete set null;
alter table public.calendar_events add column if not exists modality text check (modality in ('Presencial','Virtual'));
alter table public.calendar_events add column if not exists series_id uuid;

-- =========================================================
-- DISCORD_LINKS: vincula una cuenta del portal con un usuario de Discord,
-- para poder mandarle recordatorios por DM. El flujo es:
-- 1) El alumno pide un código desde su perfil (user.html -> "Vincular Discord").
-- 2) Le escribe /vincular <código> al bot en Discord.
-- 3) El bot (con la service_role key, que evade RLS) guarda su discord_user_id
--    acá y borra el código.
-- =========================================================
create table if not exists public.discord_links (
  user_id uuid primary key references auth.users(id) on delete cascade,
  discord_user_id text unique,
  link_code text,
  link_code_expires timestamptz,
  linked_at timestamptz,
  reminders_enabled boolean not null default true
);

alter table public.discord_links enable row level security;

drop policy if exists "Users manage their own discord link" on public.discord_links;
create policy "Users manage their own discord link"
  on public.discord_links for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =========================================================
-- REMINDER_LOG: registro de qué recordatorios ya mandó el bot, para no
-- duplicarlos si el proceso se reinicia el mismo día. Solo lo usa el bot
-- con la service_role key, así que no necesita policies (RLS activado sin
-- policies = nadie con la anon/authenticated key puede tocarlo).
-- =========================================================
create table if not exists public.reminder_log (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.calendar_events(id) on delete cascade,
  days_before int not null,
  sent_at timestamptz not null default now(),
  unique (event_id, days_before)
);

alter table public.reminder_log enable row level security;

-- =========================================================
-- AUTOPOST_LOG: qué PDFs (subject_content_items) ya posteó el bot
-- automáticamente, para no duplicarlos en cada revisión periódica (ver
-- autopost.js del bot). El canal de destino no se guarda acá: se descubre
-- por convención de nombre ("<código de materia>_material", ej.
-- "12_material" para la materia con código 12). Solo lo toca el bot con la
-- service_role key, sin policies (RLS activado sin policies = nadie con la
-- anon/authenticated key puede tocarlo).
-- =========================================================
create table if not exists public.autopost_log (
  content_item_id uuid primary key references public.subject_content_items(id) on delete cascade,
  posted_at timestamptz not null default now()
);

alter table public.autopost_log enable row level security;

-- =========================================================
-- BOT_OUTBOX: mensajes puntuales que un admin manda desde admin.html
-- (sección "Discord") para que el bot los postee en un canal. El bot hace
-- polling de esta tabla con la service_role key; la web solo puede
-- insertar/leer si es admin (RLS).
-- =========================================================
create table if not exists public.bot_outbox (
  id uuid primary key default gen_random_uuid(),
  channel_id text not null,
  content text not null,
  embed jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  error text
);

alter table public.bot_outbox add column if not exists embed jsonb;
alter table public.bot_outbox alter column content drop not null;

alter table public.bot_outbox enable row level security;

drop policy if exists "Admins manage bot_outbox" on public.bot_outbox;
create policy "Admins manage bot_outbox"
  on public.bot_outbox for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- SCHEDULED_MESSAGES: mensajes programados (una vez o recurrentes con
-- expresión cron) que el bot manda solo, configurados desde admin.html.
-- =========================================================
create table if not exists public.scheduled_messages (
  id uuid primary key default gen_random_uuid(),
  channel_id text not null,
  content text not null,
  embed jsonb,
  schedule_type text not null check (schedule_type in ('once','recurring')),
  run_at timestamptz,             -- usado si schedule_type = 'once'
  cron_expression text,           -- usado si schedule_type = 'recurring' (ej. "0 9 * * 1")
  timezone text not null default 'America/Argentina/Buenos_Aires',
  enabled boolean not null default true,
  last_run_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.scheduled_messages add column if not exists embed jsonb;
alter table public.scheduled_messages alter column content drop not null;

alter table public.scheduled_messages enable row level security;

drop policy if exists "Admins manage scheduled_messages" on public.scheduled_messages;
create policy "Admins manage scheduled_messages"
  on public.scheduled_messages for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- DISCORD_CHANNELS: espejo de los canales de texto del servidor de Discord,
-- sincronizado por el bot cada 5 min (y al iniciar). Existe para que
-- admin.html pueda mostrar un <select> con los nombres de los canales en vez
-- de pedirle al admin que copie el ID a mano desde Discord.
-- =========================================================
create table if not exists public.discord_channels (
  id text primary key,
  name text not null,
  category text,
  position integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.discord_channels enable row level security;

drop policy if exists "Discord channels viewable by authenticated users" on public.discord_channels;
create policy "Discord channels viewable by authenticated users"
  on public.discord_channels for select to authenticated using (true);

-- =========================================================
-- SUBJECT_MESSAGE_TEMPLATES: plantilla de texto (con variables tipo
-- {{materia}}) que usa el bot al postear un PDF nuevo de esa materia en su
-- canal "<código>_material". Si una materia no tiene fila acá, el bot usa
-- la plantilla general (pdf_message_template_default, más abajo).
-- =========================================================
create table if not exists public.subject_message_templates (
  subject_id text primary key references public.subjects(id) on delete cascade,
  template text not null,
  updated_at timestamptz not null default now()
);

alter table public.subject_message_templates enable row level security;

drop policy if exists "Subject templates viewable by authenticated users" on public.subject_message_templates;
create policy "Subject templates viewable by authenticated users"
  on public.subject_message_templates for select to authenticated using (true);

drop policy if exists "Only admins can modify subject templates" on public.subject_message_templates;
create policy "Only admins can modify subject templates"
  on public.subject_message_templates for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- PDF_MESSAGE_TEMPLATE_DEFAULT: la plantilla "general", editable desde
-- admin.html, que se usa para cualquier materia que no tenga su propia fila
-- en subject_message_templates. Fila única (id siempre 1). Si esta tabla
-- está vacía, el bot cae a la plantilla fija de su .env como último resorte.
-- =========================================================
create table if not exists public.pdf_message_template_default (
  id smallint primary key default 1 check (id = 1),
  template text not null default '📄 Nuevo material de **{{materia}}**: {{archivo}}',
  updated_at timestamptz not null default now()
);

alter table public.pdf_message_template_default enable row level security;

drop policy if exists "Default template viewable by authenticated users" on public.pdf_message_template_default;
create policy "Default template viewable by authenticated users"
  on public.pdf_message_template_default for select to authenticated using (true);

drop policy if exists "Only admins can modify default template" on public.pdf_message_template_default;
create policy "Only admins can modify default template"
  on public.pdf_message_template_default for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- PDF_BULK_POST_REQUESTS: botón "Publicar PDFs pendientes ahora" de
-- admin.html (sección Discord, tarjeta de plantillas). El bot hace polling
-- y postea en el canal "<código>_material" todo lo que todavía no esté en
-- autopost_log (la primera vez, es el backlog completo de la materia).
-- subject_id nulo = "todas las materias" (botón de publicar todo el backlog
-- pendiente de una vez).
-- =========================================================
create table if not exists public.pdf_bulk_post_requests (
  id uuid primary key default gen_random_uuid(),
  subject_id text references public.subjects(id) on delete cascade,
  requested_by uuid references auth.users(id) on delete set null,
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  posted_count integer,
  error text
);

-- por si esta tabla ya existía de una versión anterior de este script, con
-- subject_id todavía NOT NULL.
alter table public.pdf_bulk_post_requests alter column subject_id drop not null;

alter table public.pdf_bulk_post_requests enable row level security;

drop policy if exists "Admins manage pdf_bulk_post_requests" on public.pdf_bulk_post_requests;
create policy "Admins manage pdf_bulk_post_requests"
  on public.pdf_bulk_post_requests for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- PDF_CHANNEL_CLEAR_REQUESTS: botón "Borrar publicaciones de esta materia"
-- de admin.html. El bot borra sus propios mensajes en el canal
-- "<código>_material" correspondiente y libera esos PDFs de autopost_log,
-- para que se puedan volver a publicar limpios (sin tener que borrar a
-- mano en Discord, lo que dejaba el registro interno desincronizado).
-- subject_id nulo = todas las materias.
-- =========================================================
create table if not exists public.pdf_channel_clear_requests (
  id uuid primary key default gen_random_uuid(),
  subject_id text references public.subjects(id) on delete cascade,
  requested_by uuid references auth.users(id) on delete set null,
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  deleted_count integer,
  error text
);

alter table public.pdf_channel_clear_requests enable row level security;

drop policy if exists "Admins manage pdf_channel_clear_requests" on public.pdf_channel_clear_requests;
create policy "Admins manage pdf_channel_clear_requests"
  on public.pdf_channel_clear_requests for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- BOT_SETTINGS: interruptores generales del bot, editables en vivo desde
-- admin.html sin tocar el .env ni reiniciar el proceso. Fila única (id
-- siempre 1). Por defecto la publicación automática de PDFs está apagada:
-- el bot solo publica cuando se lo pide explícitamente desde la web
-- ("Publicar PDFs pendientes"), nunca solo.
-- =========================================================
create table if not exists public.bot_settings (
  id smallint primary key default 1 check (id = 1),
  autopost_enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.bot_settings (id) values (1) on conflict (id) do nothing;

alter table public.bot_settings enable row level security;

drop policy if exists "Settings viewable by authenticated users" on public.bot_settings;
create policy "Settings viewable by authenticated users"
  on public.bot_settings for select to authenticated using (true);

drop policy if exists "Only admins can modify settings" on public.bot_settings;
create policy "Only admins can modify settings"
  on public.bot_settings for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

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
