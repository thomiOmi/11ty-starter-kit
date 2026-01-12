/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  plugins: ['prettier-plugin-jinja-template', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.njk'],
      options: {
        parser: 'jinja-template'
      }
    }
  ]
}
