const eslintJs = require('@eslint/js');
const globals = require('globals');

module.exports = [
  // Use recommended ESLint rules
  eslintJs.configs.recommended,


  // Optional: Override/add specific rules
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {

    },
  },

  // Optional: Integrate with Prettier (install eslint-config-prettier)
  // prettierConfig,
];
