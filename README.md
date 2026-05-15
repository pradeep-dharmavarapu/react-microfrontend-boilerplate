# React Micro-Frontend Boilerplate

> **Production-grade Micro-Frontend architecture with Module Federation, shared Redux store, TypeScript, and independent CI/CD pipelines.**

[![CI/CD](https://github.com/pradeep-kumar-dharmavarapu/react-mfe-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/pradeep-kumar-dharmavarapu/react-mfe-boilerplate/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

🚀 **[Live Demo](https://react-mfe-boilerplate.vercel.app)** | 📖 **[Architecture Guide](#architecture)**

---

## Why This Exists

At T-Mobile's Orion platform, 5 independent engineering teams were building dashboards on a monolithic frontend. Every release required coordinating across all teams. A bug in one team's feature could block everyone's deployment.

We moved to Micro-Frontend architecture with Module Federation. The result:
- **Release cadence: monthly → weekly**
- **Cross-team deployment conflicts: eliminated**
- **New feature delivery time: 2 weeks → same day**

This boilerplate captures the exact patterns that made it work — cleaned up and documented for anyone to use.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Shell (port 3000)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Navigation  │  │   Auth/Redux  │  │   Routing    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│           │                │                │           │
│    ┌──────▼────────────────▼────────────────▼──────┐   │
│    │          Module Federation Host               │   │
│    └──────┬─────────────────────────────────┬──────┘   │
└───────────┼─────────────────────────────────┼──────────┘
            │ Dynamic Remote                  │ Dynamic Remote
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│  Dashboard MFE        │         │  Analytics MFE        │
│  (port 3001)          │         │  (port 3002)          │
│  Independently        │         │  Independently        │
│  deployable           │         │  deployable           │
└───────────────────────┘         └───────────────────────┘
            │                                 │
            └──────────────┬──────────────────┘
                           ▼
              ┌────────────────────────┐
              │   Shared Components    │
              │   (npm package)        │
              │   Button, Modal,       │
              │   DataTable, Charts    │
              └────────────────────────┘
```

### Key Architecture Decisions

**Dynamic Remotes** — MFE URLs are resolved at runtime from a config object (`window.__MFE_CONFIG__`). This means the shell never needs to be rebuilt when an MFE is redeployed. Just update the config.

**Singleton Shared Dependencies** — React, ReactDOM, Redux, and React Router are shared as singletons. Each MFE uses the same instance, preventing version conflicts and reducing bundle size.

**Error Boundaries per MFE** — Each remote is wrapped in an Error Boundary. A crash in the Dashboard MFE never brings down the Analytics MFE or the Shell.

**Shared Redux Store** — The shell owns the store. MFEs receive store access via React context. Auth state, UI state, and cross-MFE notifications are managed centrally.

---

## Project Structure

```
react-mfe-boilerplate/
├── shell/                    # Host application (port 3000)
│   ├── src/
│   │   ├── App.tsx           # Root with routing + Redux Provider
│   │   ├── store.ts          # Shared Redux store + typed hooks
│   │   └── components/
│   │       ├── ErrorBoundary.tsx
│   │       └── MFELoader.tsx
│   └── webpack.config.js     # Module Federation host config
│
├── mfe-dashboard/            # Dashboard micro-frontend (port 3001)
│   ├── src/
│   │   ├── App.tsx           # MFE root — exported as remote
│   │   ├── components/
│   │   └── store/            # Local MFE state (extends shared store)
│   └── webpack.config.js     # Module Federation remote config
│
├── mfe-analytics/            # Analytics micro-frontend (port 3002)
│   ├── src/
│   └── webpack.config.js
│
├── shared-components/        # Shared UI library (publishable npm package)
│   ├── src/
│   │   ├── Button/
│   │   ├── DataTable/
│   │   ├── Modal/
│   │   └── index.ts
│   └── package.json
│
└── .github/
    └── workflows/
        └── ci.yml            # Parallel MFE builds + independent deploys
```

---

## Quick Start

```bash
# Clone
git clone https://github.com/pradeep-kumar-dharmavarapu/react-mfe-boilerplate
cd react-mfe-boilerplate

# Install all workspaces
npm install

# Start all apps in parallel
npm start
# Shell:     http://localhost:3000
# Dashboard: http://localhost:3001
# Analytics: http://localhost:3002
```

---

## Independent Deployment

Each MFE deploys independently. The shell never needs to be rebuilt:

```bash
# Deploy only the Dashboard MFE
npm run build --workspace=mfe-dashboard
# Upload mfe-dashboard/dist/ to your CDN

# Update the runtime config (no shell rebuild needed)
window.__MFE_CONFIG__ = {
  dashboard: 'https://cdn.yourapp.com/dashboard/remoteEntry.js',
  analytics: 'https://cdn.yourapp.com/analytics/remoteEntry.js',
};
```

---

## Shared Components

The `shared-components` package is published as an npm package and consumed by both MFEs:

```bash
cd shared-components
npm run build
npm publish
```

Components include: `Button`, `DataTable`, `Modal`, `Spinner`, `Notification`, `Badge`

---

## What's Included

| Feature | Status |
|---|---|
| Module Federation (dynamic remotes) | ✅ |
| Shared Redux store with typed hooks | ✅ |
| TypeScript throughout | ✅ |
| Error boundaries per MFE | ✅ |
| Shared component library | ✅ |
| CI/CD with parallel MFE builds | ✅ |
| Independent deployment per MFE | ✅ |
| Hot module replacement in dev | ✅ |
| Jest + React Testing Library | ✅ |
| ESLint + Prettier | ✅ |
| Nx monorepo migration guide | 📋 Planned |
| Vite support | 📋 Planned |

---

## Based on Real Production Architecture

This boilerplate is derived from a production micro-frontend system built at **T-Mobile's Orion network operations platform** — serving multiple engineering teams across large-scale operational dashboards.

Read the full story: [How We Went From Monthly to Weekly Releases with Micro-Frontends](https://medium.com/@pradeepdharmavarapu)

---

## Author

**Pradeep Kumar Dharmavarapu** — Frontend Architect
[LinkedIn](https://linkedin.com/in/pradeep-kumar-dharmavarapu) · [GitHub](https://github.com/pradeep-kumar-dharmavarapu)

---

## License
MIT © Pradeep Kumar Dharmavarapu
