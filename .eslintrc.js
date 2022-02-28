module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
    },
    plugins: ['react'],
    rules: {
      'react/prop-types': 'error',
    }
  }
};
