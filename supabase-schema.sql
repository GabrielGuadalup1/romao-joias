-- ============================================================
-- ROMÃO JOIAS — Schema do banco (Supabase / PostgreSQL)
-- Tabelas: produtos (vitrine) e leads (formulário de contato)
-- Rode no Supabase em: SQL Editor > New query > Run
-- ============================================================

-- ----------------------------------------------------------------
-- 1) TABELA: produtos  (catálogo/vitrine, leitura pública)
-- ----------------------------------------------------------------
create table if not exists public.produtos (
  id          bigint generated always as identity primary key,
  nome        text        not null,
  categoria   text        not null check (categoria in ('Alianças', 'Joias', 'Relógios')),
  ref         text        not null unique,           -- referência da peça (ex.: 0123)
  preco       numeric(10,2) not null check (preco >= 0),
  descricao   text        not null,
  imagem      text,                                  -- caminho/URL da foto (placeholder por enquanto)
  ativo       boolean     not null default true,     -- some da vitrine se false
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- 2) TABELA: leads  (envios do formulário "agendar visita")
-- ----------------------------------------------------------------
create table if not exists public.leads (
  id              bigint generated always as identity primary key,
  nome            text        not null,
  contato         text        not null,              -- WhatsApp ou e-mail
  peca_interesse  text,                              -- nome/ref da peça (texto livre)
  mensagem        text,
  status          text        not null default 'novo' check (status in ('novo','contatado','fechado')),
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- 3) SEGURANÇA (Row Level Security) — defaults seguros
--    produtos: qualquer visitante PODE LER, mas não escrever.
--    leads: qualquer visitante PODE INSERIR (envia o formulário),
--           mas NINGUÉM anônimo pode LER (protege dados de clientes).
-- ----------------------------------------------------------------
alter table public.produtos enable row level security;
alter table public.leads    enable row level security;

-- produtos: leitura pública apenas dos itens ativos
create policy "produtos_leitura_publica"
  on public.produtos
  for select
  to anon, authenticated
  using (ativo = true);

-- leads: visitante pode apenas INSERIR (não ler, não editar)
create policy "leads_insercao_publica"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- (Para LER os leads, use o painel do Supabase ou a service_role key
--  no backend — nunca exponha leitura de leads ao público.)

-- ----------------------------------------------------------------
-- 4) DADOS DE EXEMPLO  (troque depois pelas peças e fotos reais)
-- ----------------------------------------------------------------
insert into public.produtos (nome, categoria, ref, preco, descricao, imagem) values
  ('Aliança Marco Zero',        'Alianças', '0123', 2480.00,
   'Par de alianças em ouro 18k, acabamento polido com filete fosco que evoca a linha do Equador. Gravação interna inclusa.',
   '/produtos/alianca-marco-zero.jpg'),
  ('Aliança Equador Clássica',  'Alianças', '0124', 1980.00,
   'Modelo tradicional reto em ouro 18k, conforto anatômico. O par.',
   '/produtos/alianca-equador.jpg'),
  ('Aliança Tradição',          'Alianças', '0125', 3200.00,
   'Aliança larga em ouro 18k com toque fosco central. Para quem quer presença discreta. O par.',
   '/produtos/alianca-tradicao.jpg'),

  ('Colar Ponto Zero',          'Joias',    '0210', 1650.00,
   'Colar em ouro 18k com pingente que marca o ponto de encontro das histórias. Corrente veneziana.',
   '/produtos/colar-ponto-zero.jpg'),
  ('Brincos Amazônia',          'Joias',    '0211',  890.00,
   'Brincos em ouro 18k, design leve inspirado nas formas do rio. Fecho de pressão.',
   '/produtos/brincos-amazonia.jpg'),
  ('Anel Solitário Guadalup',   'Joias',    '0212', 4200.00,
   'Solitário em ouro 18k com zircônia de alto brilho. Homenagem à origem da casa.',
   '/produtos/anel-guadalup.jpg'),

  ('Relógio Clássico Ouro',     'Relógios', '0330', 5400.00,
   'Relógio masculino folheado a ouro, mostrador marfim e pulseira em aço. Movimento quartzo.',
   '/produtos/relogio-classico.jpg'),
  ('Relógio Aço Macapá',        'Relógios', '0331', 2100.00,
   'Relógio unissex em aço escovado, resistente ao clima úmido. Mostrador ônix.',
   '/produtos/relogio-aco.jpg'),
  ('Relógio Equador Gold',      'Relógios', '0332', 6800.00,
   'Edição com detalhes em ouro 18k e ponteiros champanhe. Peça de coleção.',
   '/produtos/relogio-equador.jpg');

insert into public.leads (nome, contato, peca_interesse, mensagem) values
  ('Marina Souza',  '(96) 98111-0000', 'Aliança Marco Zero (ref 0123)', 'Gostaria de agendar uma visita para ver as alianças.'),
  ('Renan Lima',    'renan.lima@email.com', 'Anel Solitário Guadalup (ref 0212)', 'É possível gravar uma data por dentro?'),
  ('Beatriz Castro','(96) 98222-0000', NULL, 'Vocês fazem ajuste de tamanho de aliança comprada aí?');

-- ============================================================
-- FIM
-- ============================================================
