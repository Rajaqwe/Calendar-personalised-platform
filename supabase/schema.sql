create extension if not exists "pgcrypto";

create type public.user_role as enum ('user', 'admin');
create type public.calendar_status as enum ('draft', 'processing', 'ready', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  phone text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calendar_templates (
  id text primary key,
  name text not null,
  category text not null,
  description text,
  configuration jsonb not null default '{}'::jsonb,
  thumbnail_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calendars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  template_id text not null references public.calendar_templates(id),
  name text not null default 'Untitled calendar',
  year integer not null default extract(year from now())::integer,
  status public.calendar_status not null default 'draft',
  source_image_path text,
  preview_url text,
  pdf_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calendar_pages (
  id uuid primary key default gen_random_uuid(),
  calendar_id uuid not null references public.calendars(id) on delete cascade,
  page_number integer not null check (page_number between 1 and 12),
  month integer not null check (month between 1 and 12),
  preview_url text,
  created_at timestamptz not null default now(),
  unique(calendar_id, page_number),
  unique(calendar_id, month)
);

create index calendars_user_id_idx on public.calendars(user_id);
create index calendar_pages_calendar_id_idx on public.calendar_pages(calendar_id);

alter table public.profiles enable row level security;
alter table public.calendar_templates enable row level security;
alter table public.calendars enable row level security;
alter table public.calendar_pages enable row level security;

create policy "Users can read their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Anyone authenticated can read active templates" on public.calendar_templates for select to authenticated using (is_active = true);
create policy "Users can read own calendars" on public.calendars for select using (auth.uid() = user_id);
create policy "Users can create own calendars" on public.calendars for insert with check (auth.uid() = user_id);
create policy "Users can update own calendars" on public.calendars for update using (auth.uid() = user_id);
create policy "Users can delete own calendars" on public.calendars for delete using (auth.uid() = user_id);
create policy "Users can read own calendar pages" on public.calendar_pages for select using (
  exists (select 1 from public.calendars c where c.id = calendar_id and c.user_id = auth.uid())
);
create policy "Users can create own calendar pages" on public.calendar_pages for insert with check (
  exists (select 1 from public.calendars c where c.id = calendar_id and c.user_id = auth.uid())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

insert into public.calendar_templates (id, name, category, description) values
('01','Modern Portrait','Editorial','Clean typography with a bold image field.'),
('02','Clinical Lines','Minimal','Precise grid, generous whitespace and calm rhythm.'),
('03','Heritage','Classic','Warm paper tones with an elegant framed portrait.'),
('04','Motion','Expressive','A dynamic composition built around movement.'),
('05','Monogram','Premium','Large type and a sophisticated image crop.'),
('06','Botanical','Lifestyle','Soft organic shapes surrounding the portrait.'),
('07','Focus','Modern','High contrast editorial framing.'),
('08','Gridline','Corporate','Structured geometry for professional brands.'),
('09','Sunlit','Warm','Bright composition with an optimistic feel.'),
('10','Noir','Luxury','Dark, cinematic treatment for standout calendars.'),
('11','Studio','Contemporary','Gallery-inspired image and type pairing.'),
('12','Signature','Premium','A refined signature layout made for gifting.')
on conflict (id) do nothing;
