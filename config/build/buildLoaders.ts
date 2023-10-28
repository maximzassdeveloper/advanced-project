import { RuleSetRule } from 'webpack'
import { buildStyleLoader } from './loaders/buildStyleLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { paths } = options

  const babelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true })
  const styleLoader = buildStyleLoader(options)
  const svgLoader = buildSvgLoader()

  const assetsLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource',
  }

  return [babelLoader, tsxBabelLoader, styleLoader, svgLoader, assetsLoader]
}
