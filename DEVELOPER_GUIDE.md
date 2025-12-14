# NerdPOS Developer Guide

## Architecture

This project uses a **Feature-Based Architecture**.

### Directory Structure

```text
src/
├── assets/                 # Static assets
├── components/             # Shared UI components
│   ├── ui/                 # Atomic design elements (Buttons, Inputs)
│   ├── layout/             # Layout components (Shell, Sidebar)
│   └── guards/             # Route guards (AuthGuard)
├── features/               # distinct features
│   ├── sales-pos/          # POS-specific logic
│   │   ├── components/     # Feature-scoped components
│   │   ├── hooks/          # Feature-scoped hooks
│   │   ├── stores/         # State management (Zustand)
│   │   └── types/          # Feature types
│   └── auth/               # Authentication feature
├── lib/                    # Configuration (Axios, Utils)
└── styles/                 # Global styles
```

## Tech Stack

-   **Framework**: React 18 + Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (v3) + clsx + tailwind-merge
-   **State Management**: Zustand + React Query
-   **API**: Axios
-   **Icons**: Lucide React
-   **I18n**: i18next

## Coding Standards

-   Use **Path Aliases** (`@/`) for imports.
-   Place feature-specific code inside `src/features/[feature-name]`.
-   Use `cn()` for class merging.
-   Follow Atomic Design principles for `components/ui`.