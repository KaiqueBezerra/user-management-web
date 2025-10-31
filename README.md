# Frontend de Gerenciamento de Usuários

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack%20Router-FF8900?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-1C1E2E?style=for-the-badge&logo=i18next&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

## 📜 Sobre o Projeto

- Aplicação web para gerenciamento de usuários, consumindo uma API REST em `http://localhost:3333/api`.
- Foco em experiência de uso, performance e consistência visual (tema escuro).
- Recursos: autenticação com JWT, listagem com filtros e paginação, detalhes do usuário, histórico de desativação, internacionalização (pt/en).

## ✨ Tecnologias Principais

- `https://vitejs.dev/` — Dev server rápido, HMR e build otimizado.
- `https://react.dev/` — Biblioteca para UI componentizada.
- `https://www.typescriptlang.org/` — Tipagem estática e DX.
- `https://tanstack.com/query/latest` — Data fetching, cache e status de requisições.
- `https://tanstack.com/router/latest` — Rotas com geração de árvore (`routeTree.gen.ts`).
- `https://tailwindcss.com/` — Estilização utilitária (tema escuro predominante).
- `https://www.i18next.com/` — Internacionalização (locales `en` e `pt`).

## 🧩 Principais Funcionalidades

- Autenticação: login, validação de token e persistência em `localStorage`.
- Dashboard: listagem com filtros (role, status, ordenação) e paginação.
- Detalhes: modal com dados do usuário e ações visuais (editar, desativar/reativar, excluir).
- Histórico de desativação: modal dedicado mostrando razões, datas e administrador responsável.
- Internacionalização: alternância de idioma via componente `language-switcher`.

## 🔗 Integração com a API

- Base: `http://localhost:3333/api`.
- Endpoints consumidos (exemplos):
  - `GET /users` — Lista paginada, com filtros e ordenação.
  - `GET /users/:id` — Detalhes de um usuário.
  - `GET /users/:id/deactivation-history` — Histórico de desativação/reativação.
  - `POST /auth/login` — Autenticação e obtenção do token.

> Observação: o token é lido de `localStorage` e enviado como `Authorization: Bearer <token>`.

## 🚀 Começando (Setup)

### Pré-requisitos

- Node.js (v22.17.0 ou superior)
- `pnpm` instalado globalmente (`npm i -g pnpm`)
- Backend rodando em `http://localhost:3333` (com CORS habilitado)

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm run dev
```

- Acesse em `http://localhost:5173`

### Build

```bash
pnpm run build
```

### Preview de Build

```bash
pnpm run preview
```

## 🗂️ Estrutura de Pastas

```
src/
  components/
    dashboard/            # Lista, item, paginação, filtros
    form/                 # Botões (Button, IconButton), inputs
    modals/               # Modais (detalhes, histórico)
    toast/, spin/         # Feedback visual
  context/auth/           # Provider/Contexto de autenticação
  http/                   # Hooks de requisição (users, auth, histórico)
    auth-functions/
    users-functions/
    deactivation-history-functions/
    types/                # Tipos de respostas da API
  i18n/                   # Configuração de internacionalização
  locales/                # Traduções (pt, en)
  routes/                 # Rotas (_auth, dashboard, root)
  routeTree.gen.ts        # Árvore de rotas (TanStack Router)
```

## 🧭 Fluxo de Uso

- Login: recebe token e armazena em `localStorage`.
- Ao entrar no dashboard:
  - Lista usuários com filtros e paginação.
  - Clique em uma linha abre o modal de detalhes.
  - Botão “Histórico” abre o modal com desativações/reativações.

## 🔒 Autenticação

- Token JWT enviado em todas as requisições protegidas.
- Validação de token utilizando hooks padronizados com React Query.

## 🌐 Internacionalização

- Pastas `locales/en` e `locales/pt`.
- Componente `language-switcher` para alternar idioma em tempo de execução.

## 🧪 Padrões e Boas Práticas

- Hooks de dados centralizados em `src/http/*`.
- `queryKey` determinístico por recurso/parâmetros.
- Componentização e reutilização (Buttons, IconButton com `twMerge`).
- Estilo consistente em tema escuro com Tailwind.

## ⚙️ Configurações úteis

- API base: atualmente definida diretamente nos hooks (ex.: `fetch("http://localhost:3333/api/users")`).
  - Dica: extraia para uma constante/variável de ambiente conforme necessidade.