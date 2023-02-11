import { Configuration } from 'webpack'
import { builDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolver } from './buildResolver'
import { BuildOptions } from './types/config'

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { mode, paths, isDev } = options

  return {
    mode,
    entry: paths.enrty,
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: paths.output,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolver(options),
    devServer: isDev ? builDevServer(options) : undefined,
    devtool: isDev ? 'inline-source-map' : undefined,
  }
}
