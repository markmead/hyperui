import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...pluginVue.configs['flat/recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
  {
    rules: {
      'vue/comma-dangle': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vuejs-accessibility/no-static-element-interactions': 'warn'
    }
  }
)
