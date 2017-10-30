module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    }
  },
  extends: "eslint:recommended",
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "semi": ["error", "never"],
    "no-shadow": "error",
    "no-undefined": "error",
    "quotes": [2, "double", "avoid-escape"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  plugins: [
    "react",
  ],
}
