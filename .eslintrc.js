/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */

module.exports = {
  ignorePatterns: ["node_modules", "dist", "**/*.d.ts"],
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "prettier",
  ],
  plugins: ["tailwindcss", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "max-len": "off",
    "vue/multi-word-component-names": "off",
    "no-shadow": "off",
    "prettier/prettier": [
      "off",
      { singleQuote: true, endOfLine: "auto", trailingComma: "all" },
    ],
    "tailwindcss/no-contradicting-classname": "error",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
