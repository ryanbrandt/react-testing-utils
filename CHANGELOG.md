# Changelog

## 0.6.0 (unreleased)

### React 19 support

- `react` and `react-dom` peers are now `^18.3.0 || ^19.0.0`.
- `assertCalledWith`, `assertLastCalledWith` and `assertNthCalledWith` match
  only the props argument of each call. They used to expect exactly two
  arguments, `(objectContaining(props), anything())`. React 19 passes
  `undefined` as a function component's second argument, so every call
  assertion failed on React 19. Method names, signatures and the props
  matching (a subset of props, via `expect.objectContaining`) are unchanged.
- The type declarations use `JSX` imported from `react` instead of the
  global `JSX` namespace, which `@types/react` 19 removed. TypeScript
  consumers need `@types/react` 18.2.6 or later.
- Tests run on React 19 and on React 18.3 (`yarn test:react18`).

### Peer dependencies

The open-ended `>=` ranges are now explicit major ranges that include the
current majors:

| Peer                             | 0.5        | 0.6                                                     |
| -------------------------------- | ---------- | ------------------------------------------------------- |
| `react`, `react-dom`             | `>=17.0.2` | `^18.3.0 \|\| ^19.0.0`                                  |
| `@testing-library/react`         | `>=12.1.2` | `^13 \|\| ^14 \|\| ^15 \|\| ^16` (React 19 needs 16.1+) |
| `@testing-library/dom`           | `>=8.13.0` | `^8.13.0 \|\| ^9 \|\| ^10`                              |
| `@testing-library/jest-dom`      | `>=5.14.1` | `^5.14.1 \|\| ^6 \|\| ^7`                               |
| `@testing-library/user-event`    | `>=14.1.0` | `^14.1.0`                                               |
| `jest`, `jest-environment-jsdom` | `>=28.1.0` | `^28.1.0 \|\| ^29 \|\| ^30`                             |

React 17 (and `@testing-library/react` 12, which only supports React 17) is
no longer supported.

### Package

- New `exports` map: `.` resolves to `types` / `module` (ESM) / `default`
  (CJS), and `./dist/*` and `./package.json` stay importable. Deep imports
  of other paths are no longer possible.
- Type declarations moved from `dist/@types/` to `dist/` (`types` field:
  `./dist/index.d.ts`). The exported API and its types are unchanged.
- New export: `JestUtilities` (`assertAsMockFunction`, `assertAsMockClass`).
  Jest's built-in `jest.mocked()` does the same.
- TypeScript consumers need TypeScript 4.5 or later. The declarations were
  checked with TS 4.5, 5.0, 5.9 and 6.0, and with `node`, `node16` and
  `bundler` module resolution. TS 4.4 and older can't parse the
  `@testing-library/jest-dom` 6+ types.
- `engines.node` is `>=20.19`.

### Tooling

- Yarn 4, Node 24 (`.nvmrc`), TypeScript 6.
- Rollup 4 with `@rollup/plugin-typescript` and `@rollup/plugin-terser`;
  declarations come from `tsc` + `tsc-alias`. Drops `ttypescript`, which
  broke the build on current Node.
- Jest 30, ts-jest 29, React Testing Library 16, jest-dom 7.
- ESLint 10 flat config, Prettier 3.
- CircleCI on Node 24: lint, format, typecheck, tests (React 19 and 18.3)
  and build.
