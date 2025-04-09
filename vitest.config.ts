import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    workspace: [
      {
        test: {
          exclude: ['node_modules/**', 'src/browser/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          include: ['src/browser/**/*.test.ts'],
          environment: 'happy-dom',
        },
      },
    ],
  },
})
