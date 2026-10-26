import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "frontend/**"],
  },
  {
    files: [
      "index.js",
      "db.js",
      "config.js",
      "routes/**/*.js",
      "Middleware/**/*.js",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];