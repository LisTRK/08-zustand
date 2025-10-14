## Quick orientation for AI coding agents

This is a small Next.js app using the App Router (app/), TypeScript, CSS Modules, and TanStack (React) Query for data fetching and caching. Use this doc to understand the project's structure, data flow patterns, and developer workflows before making changes.

Key facts (high level)

- Next.js app router: server components live under `app/` by default. Client components must include `"use client"` at the top (see `app/notes/Notes.client.tsx`).
- React Query is the main data layer. The provider is mounted in `app/layout.tsx` via `components/TanStackProvider/TanStackProvider.tsx`.
- Data fetching helpers are in `lib/api.ts` (axios instance). Many pages prefetch with a `QueryClient`, dehydrate and wrap with `HydrationBoundary` so client components can use the same query keys.
- Type definitions live in `types/note.ts` (note shape and `Tag` union).

Important files to know

- `app/layout.tsx` — root layout; injects `TanStackProvider`, `Header`, and `Footer`.
- `lib/api.ts` — axios defaults (baseURL, headers) and functions: `fetchNotes`, `createNote`, `deleteNote`, `getNoteById`.
  - Note: the Authorization token is currently hard-coded (commented alternative present). Prefer using env var `NEXT_PUBLIC_NOTEHUB_TOKEN` instead of committing secrets.
- `app/notes/page.tsx` & `app/notes/[id]/page.tsx` — server components that prefetch queries and pass state via `dehydrate` + `HydrationBoundary`.
- `app/notes/Notes.client.tsx` & `app/notes/[id]/NoteDetails.client.tsx` — client components that call `useQuery` with keys `['notes', query, page]` and `['note', id]` respectively.
- `components/*` — UI building blocks. Each component typically has paired `.module.css` for styling.

Patterns and conventions (do this)

- Preserve server/client boundaries. If you add hooks or browser-only APIs, convert the file into a client component by adding `"use client"` at top.
- Keep React Query keys consistent. Server prefetch uses the same keys as client `useQuery`. Examples:
  - Server prefetch: `queryClient.prefetchQuery({ queryKey: ["notes"], queryFn: () => fetchNotes() })` (`app/notes/page.tsx`)
  - Client query: `useQuery({ queryKey: ["notes", query, page], queryFn: () => fetchNotes(query, page) })` (`app/notes/Notes.client.tsx`)
- Use the project TypeScript types in `types/note.ts`. `Tag` is a union type — avoid introducing unknown tag values without updating the type.
- Follow file naming pairing: `components/Foo/Foo.tsx` and `components/Foo/Foo.module.css`.

Developer workflows (how to run and check things)

- Install deps: `npm install` (this repo uses npm but yarn/pnpm are possible). The project expects Node + npm.
- Run dev server: `npm run dev` (package.json uses `next dev --turbopack`).
- Build: `npm run build` (`next build --turbopack`).
- Start prod server: `npm run start`.
- Lint: `npm run lint`.
- Type-checking: TypeScript is enabled (see `tsconfig.json`), run `npx tsc --noEmit` when needed.

Integration points & external dependencies

- API backend: `lib/api.ts` sets `axios.defaults.baseURL = "https://notehub-public.goit.study/api"` and an Authorization token header. If you need to change API endpoints or switch environments, edit `lib/api.ts` and prefer reading the token from `process.env.NEXT_PUBLIC_NOTEHUB_TOKEN`.
- Third-party libraries used prominently:
  - `@tanstack/react-query` (v5) and `@tanstack/react-query-devtools`
  - `axios` for HTTP
  - `formik` + `yup` for forms and validation
  - `react-paginate`, `react-spinners`, `use-debounce`

Project-specific gotchas / items to watch for

- Path alias: imports use `@/...` (tsconfig `paths` maps `@/*` to `./*`). Preserve this when adding or moving files (e.g., `import { fetchNotes } from '@/lib/api'`).
- Mixed import styles: some components import Link correctly (`next/link`), but `components/TagsMenu/TagsMenu.tsx` imports `Link` from `next/dist/client/link` — prefer `next/link`.
- Hard-coded auth token: `lib/api.ts` currently contains a bearer token string. Don't commit changes that expose real tokens; prefer environment variables.
- CSS Modules: class names are locally scoped. When refactoring markup, update the corresponding `.module.css` file alongside TSX changes.
- Client/server hydration pattern: server components prefetch and dehydrate then render a `HydrationBoundary` with a client child. When editing this flow, ensure query keys and prefetch queries remain aligned to avoid refetches.

Known small bugs & TODOs (helpful for triage)

- `components/TagsMenu/TagsMenu.tsx` has an incomplete `Tags.map` (it returns nothing) and the `Tags` array contains `Important` which is not in `types/note.ts` `Tag` union; consider reconciling the array or updating `types/note.ts`.
- `components/NoteDetails/NoteDetails.tsx` contains commented placeholder markup — actual details are in `app/notes/[id]/NoteDetails.client.tsx`.

If you change network behavior

- Update `lib/api.ts`. If you add query params or change the response shape, update usages in `app/notes/Notes.client.tsx`, `components/NoteList/NoteList.tsx`, and `types/note.ts`.

When committing changes

- Keep commits small and focused. Update corresponding `.module.css` files and Types when changing component props or API shapes.

If anything above is unclear or you want the document to include more examples (tests, CI hints, or PR checklist), tell me which area to expand and I will iterate.
