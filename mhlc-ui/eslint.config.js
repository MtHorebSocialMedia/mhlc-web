const eslintJs = require('@eslint/js');
const eslintPluginVue = require('eslint-plugin-vue');

module.exports = [
  // Use recommended ESLint rules
  eslintJs.configs.recommended,

  // Use recommended Vue 3 ESLint rules (for flat config, use "flat/recommended")
  ...eslintPluginVue.configs['flat/recommended'],

  // Specific configuration for Vue files
  {
    files: ['**/*.vue'],
    languageOptions: {

    },
  },

  // Optional: Override/add specific rules
  {
    rules: {
      // Example: turn off 'multi-word-component-names' rule
      'vue/multi-word-component-names': 'off',
      // Example: error on unused vars in Vue files
      'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
    },
  },

  // Optional: Integrate with Prettier (install eslint-config-prettier)
  // prettierConfig,
];
