module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    radix: 0,
    "no-shadow": "off",
    "react/jsx-filename-extension": [0],
    "import/extensions": "off",
    "react/button-has-type": 0,
    "jsx-a11y/click-events-have-key-events":0,
    "jsx-a11y/no-noninteractive-element-interactions":0,
    "no-nested-ternary":0,
  },
};
