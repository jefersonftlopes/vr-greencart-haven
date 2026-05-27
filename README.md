# 🛒 Green Cart Haven

> E-commerce de hortifruti construído em **micro frontend** com **Module Federation 2.0** — teste técnico Senior Front-End (VR).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Module Federation](https://img.shields.io/badge/Module%20Federation-2.0-1B8AC4)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=white)
![Tests](https://img.shields.io/badge/tests-61%20passing-success)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)

---

## 📑 Índice

- [Escopo do teste](#-escopo-do-teste-o-que-foi-pedido)
- [Como rodar](#-como-rodar)
- [Arquitetura](#️-arquitetura)
- [Stack](#️-stack)
- [Scripts NPM](#-scripts-npm)
- [APIs consumidas](#-apis-consumidas)
- [Critérios do teste técnico](#-critérios-do-teste-técnico)
- [✨ EXTRAS — além do escopo](#-extras--além-do-escopo)
- [Decisões técnicas](#-decisões-técnicas)
- [Estrutura de arquivos](#-estrutura-de-arquivos-relevante)
- [Deploy](#-deploy)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Escopo do teste (o que foi pedido)

Conforme o PDF do desafio, foi solicitado:

| Requisito | Status |
|---|---|
| Aplicação **React JS** com micro front-end usando **Module Federation** | ✅ Vite 5 + `@module-federation/vite` 2.0 |
| **1 app central + 3 apps** (Header, Footer, Cards) | ✅ Host + Header + Footer + Cards |
| **Cards** com lista de produtos | ✅ Grid responsivo paginado |
| **Interação Cards → Header** que abre **modal** com produtos selecionados | ✅ `dispatch(addToCart)` → drawer lateral |
| Consumo da API de **Layout (Figma)** | ✅ Cores, tipografia, componentes extraídos via Figma MCP |
| Consumo da API **Products** (`dummyjson.com/products`) | ✅ RTK Query |
| Consumo da API **Cart** (`dummyjson.com/carts`) | ✅ `POST /carts/add` no checkout |
| Scripts **`start`**, **`build`**, **`test`** | ✅ `pnpm start`, `pnpm build`, `pnpm test` |
| README com instruções para rodar | ✅ Este arquivo |

**Tudo o que o teste pediu está entregue.** A seção [**EXTRAS**](#-extras--além-do-escopo) lista o que foi feito **além** do solicitado.

---

## 🚀 Como rodar

### Requisitos
- **Node.js** 20+
- **pnpm** 10+

### Instalação
```bash
git clone https://github.com/jefersonftlopes/vr-greencart-haven.git
cd vr-greencart-haven
pnpm install
```

### Desenvolvimento
Sobe todos os apps simultaneamente (host + remotes):
```bash
pnpm start
```

| App | URL |
|---|---|
| **Host (entrypoint)** | http://localhost:3000 |
| Header (standalone) | http://localhost:3001 |
| Footer (standalone) | http://localhost:3002 |
| Cards (standalone) | http://localhost:3003 |
| *Checkout (extra)* | http://localhost:3004 |

### Build de produção
```bash
pnpm build
```

### Testes
```bash
pnpm test
```

---

## 🏗️ Arquitetura

```
greencart-haven/                    # monorepo pnpm
├── apps/
│   ├── host/        :3000          # ✅ app central — pedido pelo teste
│   ├── header/      :3001          # ✅ remote — pedido pelo teste
│   ├── footer/      :3002          # ✅ remote — pedido pelo teste
│   ├── cards/       :3003          # ✅ remote — pedido pelo teste
│   └── checkout/    :3004          # 🌟 EXTRA — não pedido no teste
├── packages/
│   ├── ui/                         # design system
│   ├── types/                      # tipos compartilhados
│   └── store/                      # Redux + RTK Query + MSW
└── ...
```

```
┌──────────────────────────────────────────────────┐
│                  HOST (:3000)                    │
│  ┌─────────────────────────────────────────┐    │
│  │       HEADER REMOTE (:3001)             │    │  ← Carrinho
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │  HomePage = Hero + Categories + Banners │    │
│  │             + CARDS REMOTE (:3003)      │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │       FOOTER REMOTE (:3002)             │    │
│  └─────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
       ↕ store Redux singleton compartilhado via MF
```

### Fluxo principal (pedido pelo teste)

1. `Cards.ProductCard` chama `dispatch(addToCart(product))` no store singleton.
2. `Header` observa o store via `useAppSelector(selectCartCount)` e atualiza o badge.
3. Clique no carrinho dispara `openCart()` → **modal lateral** com a lista de produtos selecionados (Radix Dialog).

O store Redux é **singleton via Module Federation `shared`**, garantindo uma única fonte de verdade entre todos os remotes em runtime.

---

## 🛠️ Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Bundler / MF | Vite + `@module-federation/vite` | 5 / 1.1 |
| UI | React (com Compiler) + TypeScript | 19 / 5.6 |
| Estado | Redux Toolkit + RTK Query | 2 / — |
| Styling | Tailwind CSS (CSS-first) + Radix UI | 4 |
| Testes | Vitest + Testing Library | 2 / 16 |
| Lint/Format | Biome | 1.9 |
| Package manager | pnpm (workspaces) | 10 |

---

## 📦 Scripts NPM

| Script | Descrição |
|---|---|
| `pnpm start` | Inicia os apps em paralelo (dev) — **pedido pelo teste** |
| `pnpm build` | Build de produção de todos os apps — **pedido pelo teste** |
| `pnpm test` | Roda todos os testes — **pedido pelo teste** |
| `pnpm preview` | Serve os builds em paralelo |
| `pnpm test:coverage` | Testes com cobertura |
| `pnpm lint` | Biome check |
| `pnpm format` | Biome format --write |

---

## 🌐 APIs consumidas

### [DummyJSON Products](https://dummyjson.com/docs/products) — via **RTK Query**
- `GET /products?limit=&skip=&sortBy=&order=` — listagem paginada
- `GET /products/categories` — categorias
- `GET /products/category/:slug?...` — filtro por categoria
- `GET /products/search?q=` — busca textual
- `GET /products/:id` — detalhes

### [DummyJSON Carts](https://dummyjson.com/docs/carts) — via **RTK Query mutation**
- `POST /carts/add` — confirma o pedido (`{ userId, products }` → `{ id, total, ... }`)

---

## ✅ Critérios do teste técnico

| Critério VR | Como foi atendido |
|---|---|
| **Ferramentas adotadas** | MF 2.0, React 19, Vite 5, Tailwind 4, RTK Query |
| **Consumo de API** | DummyJSON Products + Carts via RTK Query |
| **Design Responsivo** | Mobile-first (validado em 375 / 768 / 1280px+) |
| **Gerenciamento de estado** | Redux Toolkit 2 com slices + RTK Query |
| **Performance** | Lazy load dos remotes, code splitting, cache RTK, `loading=lazy` |
| **Testes** | 61 testes em 17 arquivos (unit + component + integração) |
| **Semântica e organização** | Estrutura clara por feature; semantic HTML; ARIA; monorepo limpo |
| **Reaproveitamento** | Design system em `@greencart/ui`; helpers compartilhados |

---

## ✨ EXTRAS — além do escopo

> Tudo nesta seção **não foi pedido** no enunciado mas foi entregue para elevar a qualidade técnica e a experiência do usuário.

### 🆕 Funcionalidades extras

#### 1. App extra de Checkout (4º remote)
- O teste pediu apenas Header, Footer e Cards.
- Foi adicionado um **5º app**: `checkout` (:3004) com:
  - Tela de revisão do pedido com layout 2 colunas (itens + Order Summary sticky)
  - Cálculo de **frete grátis acima de $50**
  - Controles de quantidade (+/-) e remover item no checkout
  - Tela de **sucesso** com número do pedido
  - **Empty state** dedicado se carrinho vazio
  - Integração real com `POST /carts/add` da DummyJSON

#### 2. Roteamento via URL (`react-router-dom`)
- O teste não pediu rotas.
- Adicionado React Router 7 **compartilhado entre os remotes**: rotas `/`, `/checkout`, `/checkout/success`
- Habilita: **deep linking**, **botão voltar do browser**, URLs compartilháveis

#### 3. Persistência do carrinho (`redux-persist`)
- O carrinho e o idioma não somem ao recarregar a página
- `whitelist: ['items', 'lastOrderId']` — não persiste estado de UI (drawer aberto)

#### 4. Internacionalização PT/EN (`i18next`)
- LanguageSwitcher no header
- **Sincronização cross-remote via Redux subscribe** — `setLanguage(...)` atualiza i18next em todos os 5 apps simultaneamente
- ~40 chaves traduzidas

#### 5. Filtros e ordenação avançados
- `FilterDrawer` lateral com 3 dimensões: **Categoria** (chips da API real), **Ordenar por** (5 opções), **Ordem** (asc/desc)
- Paginação completa com ellipsis (1 … 4 5 6 … 10) e suporte a teclado

#### 6. Rating com estrelas + Modal de avaliações
- Componente `<Rating />` reutilizável (5 estrelas com suporte a meia estrela)
- Posicionado no canto superior direito de cada `ProductCard`
- **Clicável** — abre `ReviewsModal` centralizado com:
  - Nota grande + resumo
  - Lista de reviews com avatar (iniciais), nome, data formatada por idioma (`Intl.DateTimeFormat`), nota individual e comentário
- Modal `<Modal variant="center">` adicionado no design system (drawer continua sendo o default)

#### 7. Seções de marketing na home (Hero + Banners)
- Hero com imagem e CTA
- 3 banners destacados (BIG SALE / SUPER SALE / 20% DISCOUNT) idênticos ao Figma
- Carrossel de categorias visuais com fotos reais

#### 8. Header sticky
- Acompanha o scroll em qualquer página (`position: sticky; top: 0; z-50`)

#### 9. ARIA live region
- Anuncia "produto X adicionado ao carrinho" para leitores de tela ao clicar Adicionar

#### 10. Acessibilidade reforçada
- `aria-label`, `aria-pressed`, `aria-current`, `aria-live`, `aria-expanded` corretamente aplicados
- Focus rings visíveis (`focus-visible:ring-2`)
- Semantic HTML em todos os componentes
- `decoding="async"` + `loading="lazy"` em imagens

#### 11. Empty states
- Carrinho vazio com ícone e CTA
- Lista de produtos vazia
- Categoria sem resultados
- Produto sem reviews

---

### 🧪 Engenharia de testes extra

O teste pediu "Testes". Foram entregues **74 testes em 19 arquivos**:

| Pacote | Arquivos | Testes |
|---|---|---|
| `@greencart/store` | 4 | 22 |
| `@greencart/cards` | 5 | 25 (ProductCard, Rating, ReviewsModal, Pagination, ProductList) |
| `@greencart/header` | 3 | 9 |
| `@greencart/checkout` | 3 | 13 |
| `@greencart/footer` | 1 | 2 |
| `@greencart/host` | 1 | 3 |

Camadas cobertas:
- **Unit**: reducers, selectors, cálculos de frete/total/plural
- **Component**: render + interação (`@testing-library/user-event`)
- **Integração**: fluxo completo add-to-cart → checkout → `POST /carts/add` → success com **MSW** mockando a API

Extras na infra de testes:
- **MSW** (Mock Service Worker) com handlers reutilizáveis em `@greencart/store/test`
- Helper `renderWithProviders(<UI />, { store?, route? })` compartilhado entre todos os apps (DRY)
- **Stubs de federação** (`apps/host/src/test/stubs/*`) resolvendo `header/Header`, `cards/ProductList` etc. via Vite alias quando rodando em jsdom

---

### 🔧 Infraestrutura e DX extras

| Item | O que faz |
|---|---|
| **CI GitHub Actions** | `.github/workflows/ci.yml`: install → lint → test → build em cada PR |
| **Husky + lint-staged** | Pre-commit hook formata automaticamente arquivos staged via Biome |
| **`.env` / `VITE_API_BASE_URL`** | Base URL da API configurável; `.env.example` documentado |
| **SEO meta tags** | description, og:image, twitter:card, theme-color, favicon |
| **Biome** | Lint + format unificado (substitui ESLint + Prettier) |
| **TypeScript strict** | `noUncheckedIndexedAccess`, `noImplicitOverride`, etc. |
| **`tailwind-merge`** | Util `cn()` que dedupe classes Tailwind conflitantes |
| **Stack de ponta** | React 19 + Tailwind 4 (beta) + Vite 5 + Vitest 2 |

---

### 📐 Pixel-perfect com Figma

- Cores extraídas via **Figma MCP** (figma-developer-mcp) e tokenizadas em `@theme`
- Imagens dos banners e hero locais em `public/` (não dependem de CDN externo)
- Layout 1:1 com a referência do designer

---

## ✅ Decisões técnicas

### Módulo Federation
- **MF 2.0** (`@module-federation/vite`), não Webpack 5 legado
- **Store singleton** via `shared: { '@greencart/store': { singleton: true } }`
- **Cada remote tem `main.tsx` próprio** — funciona standalone para deploy independente
- **`RemoteBoundary`** (ErrorBoundary) em cada slot — resiliência se um remote cair
- **Lazy load** via `React.lazy` + `Suspense`

### Estado
- **3 slices Redux**: `cart`, `filters`, `lang`
- **RTK Query** com cache automático e revalidação por foco
- **Hooks customizados** (`useCart`, `useCheckout`, `useProductList`) — separação de lógica

### Styling
- **Tailwind 4 CSS-first** com `@theme` tokens em `packages/ui/src/styles.css`
- **`@source`** apontando para todos os apps (Tailwind escaneia tudo)

---

## 📁 Estrutura de arquivos relevante

```
apps/host/src/
├── App.tsx                     # BrowserRouter + Routes + RemoteBoundary
├── pages/HomePage.tsx          # composição da home
├── sections/                   # Hero, Categories, FeaturedBanners
├── components/RemoteBoundary.tsx
└── test/stubs/                 # stubs dos remotes para Vitest

apps/header/src/
├── Header.tsx                  # sticky header + nav + cart drawer
├── components/                 # CartButton, CartDrawer, CartItem, LanguageSwitcher
└── hooks/useCart.ts

apps/cards/src/
├── ProductList.tsx             # paginação + filtro
├── ProductCard.tsx             # add-to-cart + rating clicável
├── FilterDrawer.tsx            # Category + SortBy + Order
├── components/
│   ├── Pagination.tsx
│   └── ReviewsModal.tsx        # 🌟 EXTRA: modal centralizado com reviews
└── hooks/useProductList.ts

apps/checkout/src/              # 🌟 EXTRA
├── CheckoutPage.tsx
├── OrderSuccessPage.tsx
├── components/                 # OrderTable, OrderSummary, OrderSuccess
└── hooks/useCheckout.ts

apps/footer/src/Footer.tsx

packages/store/src/
├── cartSlice.ts                # items + isOpen + lastOrderId
├── filtersSlice.ts             # category + sortBy + order
├── langSlice.ts                # current language
├── productsApi.ts              # RTK Query — Products + Carts
├── store.ts                    # createAppStore + redux-persist + singleton
├── hooks.ts                    # typed useAppDispatch / useAppSelector
└── test/                       # 🌟 EXTRA: MSW handlers + renderWithProviders

packages/ui/src/
├── Button.tsx
├── Modal.tsx                   # Radix Dialog wrapper (variant: drawer | center)
├── Skeleton.tsx
├── Badge.tsx
├── Rating.tsx                  # estrelas (suporta meia estrela) + count
├── cn.ts                       # clsx + tailwind-merge
└── styles.css                  # @theme tokens + @source paths
```

---

## 📤 Deploy

Cada remote pode ser publicado independentemente (Vercel, Netlify, Cloudflare Pages, S3+CloudFront).

Após publicar, atualize as URLs em `apps/host/vite.config.ts`:
```ts
federation({
  remotes: {
    header:   { entry: 'https://header.greencart.app/remoteEntry.js', ... },
    footer:   { entry: 'https://footer.greencart.app/remoteEntry.js', ... },
    cards:    { entry: 'https://cards.greencart.app/remoteEntry.js', ... },
    checkout: { entry: 'https://checkout.greencart.app/remoteEntry.js', ... },
  },
})
```

---

## 🐛 Troubleshooting

**Porta ocupada?**
```bash
lsof -ti:3000,3001,3002,3003,3004 | xargs kill -9
```

**Cache do MF inconsistente após mudar `shared`?**
Pare os servers, delete `apps/*/.vite` e `apps/*/.mf`, rode `pnpm start` de novo.

**HMR não atualiza traduções?**
Atualizar `locales/*.json` requer reload manual (i18next só inicializa uma vez).

---

## 👤 Autor

Desenvolvido por **Jeferson Lopes** — teste técnico Senior Front-End React para a VR (via FCamara).
