import { ResolveOptions } from 'webpack'
import { BuildOptions } from './types/config'

export function buildResolver(options: BuildOptions): ResolveOptions {
  const { paths } = options

  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': paths.src,
    },
  }
}
