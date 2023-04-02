const RULES = {
  OFF: "off",
  ERROR: "error",
  WARNING: "warn",
}
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": RULES.OFF,
    "react/prop-types": RULES.OFF,
    "no-unused-vars": RULES.WARNING,
    "react/no-unknown-property": [0, { ignore: 0 }],

    // ignoreRestSiblings: RULES.ON,
    // destructuredArrayIgnorePattern: "^_",
  },
}
