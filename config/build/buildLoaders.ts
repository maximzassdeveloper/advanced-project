import { RuleSetRule } from 'webpack'
import { buildStyleLoader } from './loaders/buildStyleLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { BuildOptions } from './types/config'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { paths } = options

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const i18nextExtractOptions = {
    locales: ['en', 'ru'],
    outputPath: paths.i18nextLocales + '/{{locale}}/{{ns}}.json',
    useI18nextDefaultValue: true,
    nsSeparator: ':',
    discardOldKeys: true,
    compatibilityJSON: 'v4',
  }

  const babelLoader = {
    test: /\.(jsx?|tsx?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [['i18next-extract', i18nextExtractOptions]],
      },
    },
  }

  const styleLoader = buildStyleLoader(options)

  const svgLoader = buildSvgLoader()

  const assetsLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource',
  }

  return [babelLoader, typescriptLoader, styleLoader, svgLoader, assetsLoader]
}
