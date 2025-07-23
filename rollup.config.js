import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  // UMD build
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "PandoraMusic",
      exports: "named",
    },
    plugins: [resolve(), commonjs()],
  },
  // ES Module build
  {
    input: "src/index.js",
    output: {
      file: "dist/index.esm.js",
      format: "es",
    },
    plugins: [resolve(), commonjs()],
  },
  // CommonJS build
  {
    input: "src/index.js",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
    },
    plugins: [resolve(), commonjs()],
  },
];
