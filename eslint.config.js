import neostandard from 'neostandard'
import prettierConfig from 'eslint-config-prettier'

export default [
  ...neostandard({
    ignores: ['dist/**', '_site/**']
  }),
  prettierConfig
]
