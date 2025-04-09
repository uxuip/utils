import uxuip from '@uxuip/eslint-config'

export default uxuip({
  typescript: {
    overrides: {
      'ts/ban-ts-comment': 'off',
      'ts/prefer-ts-expect-error': 'off',
    },
  },
})
