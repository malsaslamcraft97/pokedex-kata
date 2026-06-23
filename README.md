# 🧪 Incubyte Pokémon Kata – TDD-Driven Pokédex

Live Demo: **[https://incubyte-pokemon-kata.vercel.app/]**

---

## 📌 Overview

This project is a modern Pokédex application built using a **Test-Driven Development (TDD)** approach.

The primary focus of this implementation was not just building UI, but:

- Writing failing tests first
- Designing architecture around testability
- Separating server state from UI state
- Building scalable folder structure
- Ensuring production-ready code quality

This project demonstrates engineering discipline rather than just feature implementation.

---

## 🏳️‍🌈 UX Design

The UI/UX for this project was not randomly assembled — it was intentionally crafted through iterative AI-assisted design exploration.

I collaborated extensively with AI to:

- Explore multiple visual directions
- Refine spacing, typography, hierarchy, and layout balance
- Improve visual consistency across pages
- Align UI polish with modern product standards

For this, I have researched through multiple existing UI apps consuming the **pokeapi** and tried the best to create a unique one and explore multiple APIs rather than standard listing and details APIs.

This process involved **multiple iterations across both List and Detail views**, focusing on:

- Visual weight distribution
- Frosted glass + soft-shadow design language
- Gradient balance for stats visualization
- Badge color harmony per Pokémon type
- Readability and content hierarchy
- Mobile-first responsive refinement

Rather than accepting the first output, we iterated several times to achieve:

- A clean, premium Pokédex aesthetic
- Cohesive glassmorphism-inspired components
- Strong visual focus on hero elements
- Clear separation between informational sections
- Consistent spacing rhythm across breakpoints

The final UI reflects deliberate UX refinement rather than template-driven design.

---

### Initial Root Layout UX Design

![Inital Root Layout](/docs/base-root-list-page.png)

This was the starting structure — establishing:

- Layout framing
- Search placement
- Primary visual hierarchy

---

### Listing Page Filters (Active State)

![List Filters Active](/docs/list-filters-active.png)

Iteration focused on:

- Filter discoverability
- Active state clarity
- Visual feedback strength
- Improving button ergonomics

---

### Listing Page Filters Final Version

![List Filters Final Version](/docs/list-filters-iteration-2.png)

Refined for:

- Better spacing rhythm
- Improved contrast
- Reduced visual noise
- Cleaner micro-interactions

---

### Initial Details Page

![Initial Details Page](/docs/product-details-pokemon.png)

First iteration of:

- Hero layout
- Glow background system
- Info card positioning
- Stat distribution layout

---

### Pokemon Details Page (Stats Tab)

![Pokemon Details Page](/docs/pokemon-details-statstab.png)

Final refinement included:

- Multi-layer radar visualization
- Balanced card grouping
- Improved visual grouping of stat insights
- Responsive alignment for tablet and mobile

---

## ✅ Test-Driven Development (TDD)

The development process followed:

1. 🔴 Write a failing test
2. 🟢 Implement the minimal logic to pass
3. 🔵 Refactor safely with test coverage

This approach was applied across:

- API layer
- Redux slices
- Page rendering
- Error states
- Retry logic
- Navigation behavior
- Tab switching
- Skeleton states

---

## 🛠 Tech Stack

### Core

- React 18
- TypeScript
- Vite

### State & Data

- Redux Toolkit
- RTK Query
- MSW (Mock Service Worker)

### Styling

- SCSS Modules
- Centralized variables & mixins

### Testing

- Vitest
- React Testing Library
- MSW

### Visualization

- Recharts (Radar chart for stats visualization)

---

## 🏗 Architecture

This project follows a **feature-first, scalable architecture**.

src/
│
├── app/ → Redux store setup
├── features/
│ └── pokemon/
│ ├── api/ → RTK Query API layer
│ ├── components/ → UI components (grouped by feature)
│ │ └── detail/ → Detail page components
│ ├── pages/ → Route-level components
│ ├── store/ → UI slice state
│ └── types/ → TypeScript types
│
├── styles/ → Global SCSS variables & mixins
├── constants.ts

---

## 🧪 Testing Strategy (TDD-Centric)

### 1️⃣ API Layer Testing

- Used MSW to mock PokéAPI endpoints
- Tested success & failure scenarios
- Verified caching behavior

### 2️⃣ Page-Level Tests

Covered:

- Loading skeleton
- Error state
- Retry button behavior
- Back navigation
- Tab switching
- Species data rendering

### 3️⃣ Redux Slice Tests

- Filter updates
- Reset behavior
- Clear all behavior

### 4️⃣ UI Interaction Tests

- Select dropdown behavior
- Filter application
- Tab state changes

All tests are isolated, network-independent, and deterministic.

---

## 🌐 API Design

The application integrates 4 API interactions:

---

### 1️⃣ Pokémon List

```code
GET https://pokeapi.co/api/v2/pokemon
```

Used for:

- Paginated listing
- Search and filter operations

---

### 2️⃣ Pokémon List Enrichment

Each Pokémon in the list is enriched with:

```bash
GET https://pokeapi.co/api/v2/pokemon/:name
```

Trade-off:

- Increased API calls
- Significantly improved UI richness

---

### 3️⃣ Pokémon Details

```bash
GET https://pokeapi.co/api/v2/pokemon/:name
```

Used for:

- Hero section
- Stats
- Abilities
- Height / Weight
- Official artwork

---

### 4️⃣ Pokémon Species

```bash
GET https://pokeapi.co/api/v2/pokemon-species/:name
```

Used for:

- Description
- Egg groups
- Gender ratio
- Breeding details

Separation ensures:

- Clear data boundaries
- Maintainable components
- Predictable re-renders

---

## 🧩 State Management Philosophy

We strictly separated:

### Server State → RTK Query

- Handles caching
- Loading states
- Error states
- Refetch logic

### UI State → Redux Slice

- Filters
- Sorting
- Toolbar state
- Search state

This separation improves:

- Testability
- Predictability
- Performance
- Refactor safety

---

## 📱 Responsiveness

The application is fully responsive:

- Desktop
- Tablet
- Mobile

Approach:

- SCSS breakpoints via centralized variables
- Grid + Flexbox
- Responsive chart rendering
- Layout reordering via CSS only

---

## ⚖ Trade-offs

### 🔹 Enriched List Strategy

More API calls, but better UI.

### 🔹 Evolution Tab

Currently placeholder.
Future improvement: integrate evolution-chain endpoint.

### 🔹 No UI Framework

SCSS Modules chosen for:

- Precision
- Isolation
- Design control

---

## 🤖 AI Usage

AI was used as a collaborative assistant throughout this project — primarily as a productivity and design accelerator, not as an autonomous code generator.

It was leveraged for:

- UX exploration and iterative visual refinement
- Initial project scaffolding ideas
- Structuring and planning the RED → GREEN → REFACTOR TDD workflow
- Identifying meaningful test cases and missing edge cases
- Suggesting improvements to SCSS (gradients, glassmorphism layers, visual polish)
- Evaluating folder structure and component grouping strategies
- Reviewing written code to suggest refactoring opportunities
- Creating the Final README, and adding necessary comments on existing files to improve readability and maintenance

However:

- All architectural decisions were consciously made.
- Business logic and data modeling were implemented manually.
- API integration logic and RTK Query configuration were hand-written.
- Debugging, layout fixes, responsive behavior, and chart rendering issues were manually diagnosed and resolved with minimal AI assisstance.
- Test structure, intent, and assertions were validated and refined deliberately.

AI functioned as a collaborative engineering assistant — not as a replacement for understanding, reasoning, or system design.

The final implementation reflects deliberate decision-making, TDD discipline, and production-oriented frontend engineering practices.

---

## 🚀 Setup Instructions

### Clone the repo

```bash
git clone
cd incubyte-pokemon-kata
```

### Install dependencies

```bash

yarn install
```

### Run the tests

```bash

yarn test
```

### Start the development server

```bash

yarn dev
```

---

## 📸 Screenshots

### 🏠 Root / Listing Page

#### Desktop

![Root Desktop 1](/docs/root-desktop-1.png)
![Root Desktop 2](/docs/root-desktop-2.png)
![Root Desktop 3](/docs/root-desktop-3.png)

#### Search States

![Root Desktop Search](/docs/root-desktop-search.png)
![Root Desktop No Search](/docs/root-desktop-nosearch.png)

#### Type & Ability Highlight

![Root Desktop Type](/docs/root-desktop-type.png)
![Root Desktop Ability](/docs/root-desktop-ability.png)
![Root Desktop Height](/docs/root-desktop-height.png)

---

### 🔎 Filters & Sorting

![Filters Active](/docs/list-filters-active.png)
![Filters Final Iteration](/docs/list-filters-iteration-2.png)
![Sort By Active](/docs/root-filters-sortby-active.png)
![Pokemon Not Found Filters](/docs/root-pokemon-not-found-filters.png)

---

### 📄 Details Page

#### Desktop

![Details Desktop 1](/docs/details-desktop-1.png)
![Details Desktop 2](/docs/details-desktop-2.png)
![Details Stats Desktop](/docs/details-stat-desktop.png)
![Details Evolution Desktop](/docs/details-desktop-evolution.png)

#### Initial Design Iterations

![Initial Details Design](/docs/product-details-pokemon.png)
![Stats Tab Iteration](/docs/pokemon-details-statstab.png)

---

### 📱 Responsive Views

#### Tablet

![Root Tablet](/docs/root-tablet-1.png)

#### Mobile – Root

![Root Mobile 1](/docs/root-mobile-1.png)
![Root Mobile 2](/docs/root-mobile-2.png)

#### Mobile – Details

![Details Mobile 1](/docs/details-mobile-1.png)
![Details Mobile Stats](/docs/details-mobile-stat.png)

---

## 🏁 Deployment

Live URL:

👉 **[https://incubyte-pokemon-kata.vercel.app/]**

---

## 🎯 Final Thoughts

This project emphasizes:

- TDD-first mindset
- Clean architecture
- Maintainable folder structure
- Type-safe code
- Scalable design
- Production-level discipline

The focus was not just “making it work” —  
but ensuring it is **testable, extensible, and professionally structured**.
