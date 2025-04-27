import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  ts: true,
  prettier: true,
  ignores: [
    '/dist',
    '/node_modules',
    '*.config.js',
    '*.config.ts',
    '/build',
    '*.min.js',
    '/types/*',
    '/mock/*',
    '*.json'
  ]
})
