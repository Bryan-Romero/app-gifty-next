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
    extends: [
      // Extiende las configuraciones recomendadas
      'next/core-web-vitals', // Reglas para Core Web Vitals en Next.js
      'next/typescript', // Reglas para TypeScript en Next.js
      'prettier', // Desactiva reglas que pueden entrar en conflicto con Prettier
    ],
    plugins: [
      // Plugins adicionales para ESLint
      'unused-imports', // Plugin para detectar imports no usados
    ],
    rules: {
      // Reglas personalizadas de ESLint
      'unused-imports/no-unused-imports': 'warn', // Advierte sobre imports no usados
      'react/jsx-sort-props': [
        'warn', // Advierte si las props no están ordenadas
        {
          callbacksLast: true, // Callbacks al final
          shorthandFirst: true, // Shorthand primero
          ignoreCase: true, // Ignora mayúsculas/minúsculas al ordenar
          reservedFirst: true, // Props reservadas primero
          noSortAlphabetically: false, // Permite orden alfabético
        },
      ],
    },
  }),
  // Dejar que prettier maneje estilos,
  // eslint-config-prettier desactiva las reglas de ESLint que pueden entrar en conflicto con Prettier
  eslintConfigPrettier,
]

export default eslintConfig
