const eslintJs = require('@eslint/js');

module.exports = [
  // Use recommended ESLint rules
  eslintJs.configs.recommended,


  // Optional: Override/add specific rules
  {
    rules: {

    },
  },

  // Optional: Integrate with Prettier (install eslint-config-prettier)
  // prettierConfig,
];
