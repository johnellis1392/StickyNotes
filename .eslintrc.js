module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    "semi": ["error", "never"],
    "no-shadow": "error",
    "no-undefined": "error",
    "quotes": [2, "double", "avoid-escape"]
  }
};
