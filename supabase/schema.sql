-- ================================================================
--  Liderança Z — banco de leads
--  Cole tudo no Supabase → SQL Editor → Run
--  Pode ser num projeto que você já usa: as tabelas começam com lz_ e não mexem em nada que já existe.
-- ================================================================

create table if not exists public.lz_leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  tipo          text not null check (tipo in ('diagnostico','pre-venda')),
  nome          text not null check (char_length(nome) between 2 and 120),
  email         text not null check (char_length(email) <= 160),
  whatsapp      text check (char_length(whatsapp) <= 20),
  lidera        text check (char_length(lidera) <= 60),
  equipe        text check (char_length(equipe) <= 40),
  altitude      int  check (altitude between 0 and 9000),
  acampamento   text check (char_length(acampamento) <= 40),
  pontuacao     int  check (pontuacao between 0 and 100),
  dim_rota      int  check (dim_rota between 0 and 100),
  dim_cordada   int  check (dim_cordada between 0 and 100),
  dim_radio     int  check (dim_radio between 0 and 100),
  dim_acli      int  check (dim_acli between 0 and 100),
  respostas     text check (char_length(respostas) <= 40),
  origem        text check (origem in ('digital','evento')),
  utm_source    text check (char_length(utm_source) <= 200),
  utm_medium    text check (char_length(utm_medium) <= 200),
  utm_campaign  text check (char_length(utm_campaign) <= 300),
  status        text not null default 'novo' check (status in ('novo','contatado','comprou','descartado')),
  notas         text
);

create index if not exists lz_leads_created_at_idx on public.lz_leads (created_at desc);

-- Quem pode entrar no painel: só os e-mails desta lista
create table if not exists public.lz_admins (
  email text primary key
);

create or replace function public.lz_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.lz_admins where email = auth.jwt() ->> 'email');
$$;

alter table public.lz_leads  enable row level security;
alter table public.lz_admins enable row level security;

-- O site (visitante anônimo) só consegue INSERIR lead novo, nunca ler
drop policy if exists "site insere lead" on public.lz_leads;
create policy "site insere lead" on public.lz_leads
  for insert to anon, authenticated
  with check (status = 'novo' and notas is null);

-- Admins leem, editam e apagam
drop policy if exists "admin le leads" on public.lz_leads;
create policy "admin le leads" on public.lz_leads
  for select to authenticated using (public.lz_is_admin());

drop policy if exists "admin edita leads" on public.lz_leads;
create policy "admin edita leads" on public.lz_leads
  for update to authenticated using (public.lz_is_admin()) with check (public.lz_is_admin());

drop policy if exists "admin apaga leads" on public.lz_leads;
create policy "admin apaga leads" on public.lz_leads
  for delete to authenticated using (public.lz_is_admin());

drop policy if exists "admin ve admins" on public.lz_admins;
create policy "admin ve admins" on public.lz_admins
  for select to authenticated using (public.lz_is_admin());

-- Leads aparecem no painel em tempo real
do $$ begin
  alter publication supabase_realtime add table public.lz_leads;
exception when duplicate_object then null; end $$;

-- ================================================================
--  DEPOIS DE RODAR:
--  1. Authentication → Users → Add user (e-mail + senha de quem vai usar o painel)
--  2. Rode a linha abaixo trocando pelo e-mail criado:
--     insert into public.lz_admins (email) values ('voce@exemplo.com');
--  Só e-mails da tabela lz_admins conseguem ver os leads, mesmo que o projeto
--  tenha outros usuários de outro app. Não precisa mudar nada no login do projeto.
-- ================================================================
