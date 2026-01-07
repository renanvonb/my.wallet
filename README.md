# My.Wallet - Sistema de Gestão Financeira

Sistema completo de gestão financeira pessoal com integração ao Supabase para armazenamento de dados na nuvem.

## 🚀 Recursos

- **Dashboard Interativo**: Visualize suas finanças de forma clara e intuitiva
- **Transações**: Gerencie receitas, despesas e investimentos
- **Estratégias**: Crie e acompanhe estratégias financeiras personalizadas (integrado com Supabase)
- **Relatórios**: Análise detalhada das suas movimentações financeiras
- **Autenticação**: Sistema seguro de login e registro

## 🛠️ Tecnologias

- **React** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Recharts** para gráficos e visualizações
- **Supabase** para banco de dados e autenticação
- **React Router** para navegação
- **Framer Motion** para animações

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd antigravity
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
```

5. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

## 🗄️ Configuração do Supabase

### Estrutura das Tabelas

A integração com o Supabase já está configurada. As seguintes tabelas são utilizadas:

#### Tabela `transaction_types`

Tabela de referência para tipos de transações:

```sql
create table transaction_types (
  id uuid primary key,
  name text unique not null,
  description text,
  is_active boolean default true
);

-- Tipos disponíveis: Receita, Despesa, Investimento
```

#### Tabela `transaction_categories`

Tabela de referência para categorias de transações:

```sql
create table transaction_categories (
  id uuid primary key,
  name text unique not null,
  description text,
  icon text,
  is_active boolean default true
);

-- Categorias disponíveis: 
-- Moradia, Alimentação, Transporte, Dívidas, Impostos, 
-- Lazer, Compras, Assinaturas, Serviços
```

#### Tabela `transaction_classifications`

Tabela de referência para classificações de prioridade:

```sql
create table transaction_classifications (
  id uuid primary key,
  name text unique not null,
  description text,
  is_active boolean default true
);

-- Classificações disponíveis: Essencial, Necessário, Supérfluo
```

#### Tabela `payment_methods`

Tabela de referência para métodos de pagamento:

```sql
create table payment_methods (
  id uuid primary key,
  name text unique not null,
  description text,
  icon text,
  is_active boolean default true
);

-- Métodos disponíveis: Crédito, Débito, Dinheiro, Boleto, Pix
```

#### Tabela `transaction_destinations`

Tabela de referência para destinos de transações (cada destino pode ter uma classificação padrão):

```sql
create table transaction_destinations (
  id uuid primary key,
  name text unique not null,
  classification_id uuid references transaction_classifications(id),
  description text,
  icon text,
  is_active boolean default true
);

-- 152 destinos pré-cadastrados (supermercados, restaurantes, empresas, etc.)
```

#### Tabela `transactions`

```sql
create table transactions (
  id uuid primary key,
  created_at timestamptz default now(),
  destination_id uuid references transaction_destinations(id),
  description text not null,
  date text not null,
  payment_method_id uuid references payment_methods(id),
  amount numeric not null,
  status text not null,
  color text not null,
  initial text not null,
  transaction_type_id uuid references transaction_types(id),
  category_id uuid references transaction_categories(id),
  classification_id uuid references transaction_classifications(id),
  subcategory text,
  due_date text,
  installments text,
  user_email text
);
```

**Relacionamentos**:
- `transactions.transaction_type_id` → `transaction_types.id`
- `transactions.category_id` → `transaction_categories.id`
- `transactions.classification_id` → `transaction_classifications.id`
- `transactions.payment_method_id` → `payment_methods.id`
- `transactions.destination_id` → `transaction_destinations.id`

### Obter Credenciais do Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Crie um novo projeto ou selecione um existente
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── dashboard/   # Componentes específicos do dashboard
│   ├── layout/      # Componentes de layout
│   └── ui/          # Componentes de interface base
├── context/         # Contextos React (Auth, Transactions)
├── lib/             # Utilitários e configurações
│   └── supabase.ts  # Cliente Supabase
├── pages/           # Páginas da aplicação
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   ├── StrategiesPage.tsx    # Nova página de estratégias
│   └── ...
└── utils/           # Funções auxiliares
```

## 🎯 Funcionalidades Principais

### Transações (Integrado com Supabase)
- Crie, edite e exclua receitas, despesas e investimentos
- Armazenamento automático no Supabase
- Sincronização em tempo real entre dispositivos
- Filtro por data, tipo e categoria
- Busca por descrição
- Suporte a parcelas e vencimentos

### Dashboard
- Visão geral das finanças
- Gráficos de receitas e despesas
- Transações recentes
- Saldo total e investimentos
- Filtros de período (semana, mês, ano)

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run lint     # Executa o linter
npm run preview  # Preview da build de produção
```

## 🌐 Navegação

- `/login` - Página de login
- `/signup` - Página de cadastro
- `/dashboard` - Visão geral
- `/dashboard/transactions` - Transações
- `/dashboard/reports` - Relatórios
- `/dashboard/registrations` - Cadastros

## 🔐 Segurança

- As credenciais do Supabase estão protegidas em variáveis de ambiente
- O arquivo `.env` está no `.gitignore` para evitar exposição de credenciais
- Row Level Security (RLS) configurado no Supabase

## 📝 Notas de Desenvolvimento

Este projeto foi criado com Vite + React + TypeScript. Para expandir a configuração do ESLint ou adicionar o React Compiler, consulte a [documentação oficial do Vite](https://vitejs.dev/).

## 🚀 Deploy na Vercel

O projeto já está configurado para deploy na Vercel.

1. Faça o fork ou clone deste repositório para o seu GitHub/GitLab/Bitbucket.
2. Acesse [Vercel](https://vercel.com) e crie um "New Project".
3. Importe o repositório do projeto.
4. Na configuração do projeto, vá em "Environment Variables" e adicione as mesmas variáveis do seu `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique em "Deploy".

O arquivo `vercel.json` incluído na raiz garante que o roteamento SPA funcione corretamente após o deploy.

## 📄 Licença

Este projeto é privado e de uso interno.
