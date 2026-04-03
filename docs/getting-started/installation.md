# Installation

Sirou is built as a monorepo. You always install `@sirou/core` (the engine) plus exactly one adapter for your framework.

## Requirements

- **Node.js** 18+
- **TypeScript** 5.0+ (recommended required for full type inference)

---

## React (Vite / CRA)

```bash
npm install @sirou/core @sirou/react
# peer deps (if not already installed)
npm install react react-router-dom
```

---

## Next.js (App Router)

```bash
npm install @sirou/core @sirou/next
```

> Sirou targets the **App Router** only (Next.js 13.4+). Pages Router is not supported.

---

## SvelteKit

```bash
npm install @sirou/core @sirou/svelte
```

---

## React Native

```bash
npm install @sirou/core @sirou/react-native
# peer deps
npm install @react-navigation/native
```

---

## TypeScript Configuration

Make sure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler", // or "node16"
    "target": "ES2020"
  }
}
```

Sirou uses template literal types and conditional types that require `strict: true` for correct inference.

---

## Monorepo / Turbo Setup

If you are using Sirou inside a monorepo (e.g. Turborepo, Nx), install `@sirou/core` once at the root and `@sirou/<adapter>` in each app package.

```bash
# root
npm install @sirou/core

# apps/web
npm install @sirou/next

# apps/mobile
npm install @sirou/react-native
```
