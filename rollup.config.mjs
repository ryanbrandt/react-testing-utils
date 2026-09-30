import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

// Resolve from this file, not the working directory.
const fromRoot = (file) => resolve(import.meta.dirname, file);
const packageFile = JSON.parse(readFileSync(fromRoot("package.json"), "utf8"));

// Peers stay external, including subpaths such as react/jsx-runtime.
const peers = Object.keys(packageFile.peerDependencies);
const external = (id) =>
  peers.some((peer) => id === peer || id.startsWith(`${peer}/`));

export default {
  input: fromRoot("src/index.ts"),
  output: [
    // esModule: keep the __esModule marker Rollup 2 emitted (Rollup 3+ omits it
    // when there is no default export), so CJS interop is unchanged.
    {
      file: fromRoot(packageFile.main),
      format: "cjs",
      sourcemap: true,
      esModule: true,
    },
    { file: fromRoot(packageFile.module), format: "esm", sourcemap: true },
  ],
  external,
  // A bare import that isn't a peer would otherwise ship as an unresolved
  // require() with only a warning; report it as an error instead.
  onLog(level, log, handler) {
    if (log.code === "UNRESOLVED_IMPORT") return handler("error", log);
    handler(level, log);
  },
  plugins: [
    // Resolves the tsconfig "paths" (@lib/*) itself. JS only; declarations
    // are emitted by `tsc` + `tsc-alias` (see the build script).
    typescript({
      tsconfig: fromRoot("tsconfig.build.json"),
      declaration: false,
      emitDeclarationOnly: false,
    }),
    terser(),
  ],
};
