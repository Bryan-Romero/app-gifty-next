import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['unused-imports'],
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  }),
  // Dejar que prettier maneje estilos,
  // eslint-config-prettier desactiva las reglas de ESLint que pueden entrar en conflicto con Prettier
  eslintConfigPrettier,
]

export default eslintConfig
