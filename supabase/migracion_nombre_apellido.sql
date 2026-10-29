-- Nombre y apellido por separado.
-- Corré este script una sola vez en Supabase → SQL Editor → New query → Run.
-- Es seguro volver a correrlo: solo toca perfiles que todavía no tienen apellido.

begin;

-- 1) El alta guarda también el apellido que se carga en el registro.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, last_name, avatar, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    nullif(trim(new.raw_user_meta_data->>'last_name'), ''),
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 1)),
    'student'
  );
  return new;
end;
$$;

-- 2) Usuarios existentes sin apellido: se divide el nombre por el último
-- espacio ("Juan Pablo Gómez" → nombre "Juan Pablo", apellido "Gómez").
-- Los casos con apellido compuesto se corrigen a mano desde admin → Usuarios.
update public.profiles
set
  name = regexp_replace(btrim(name), '\s+\S+$', ''),
  last_name = substring(btrim(name) from '\S+$')
where coalesce(btrim(last_name), '') = ''
  and btrim(name) ~ '\s';

-- 3) Mayúscula inicial en cada palabra, se cargue desde donde se cargue
-- ("jUAN pablo" → "Juan Pablo"; initcap también capitaliza después de
-- guion y apóstrofo: "Pérez-García", "O'Connor").
create or replace function public.normalize_profile_name()
returns trigger
language plpgsql
as $$
begin
  new.name := initcap(regexp_replace(btrim(new.name), '\s+', ' ', 'g'));
  new.last_name := nullif(initcap(regexp_replace(btrim(coalesce(new.last_name, '')), '\s+', ' ', 'g')), '');
  new.avatar := coalesce(nullif(upper(left(new.name, 1)), ''), new.avatar);
  return new;
end;
$$;

drop trigger if exists normalize_profile_name on public.profiles;
create trigger normalize_profile_name
  before insert or update of name, last_name on public.profiles
  for each row execute procedure public.normalize_profile_name();

-- Aplica la regla a los que ya existen (dispara el trigger de arriba).
update public.profiles set name = name, last_name = last_name;

commit;

-- Para revisar el resultado:
-- select name, last_name, email from public.profiles order by last_name, name;
