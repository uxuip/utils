import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  externals: [],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    dts: {
      respectExternal: true,
    },
  },
})
