import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from '../types/config'

export function buildStyleLoader(options: BuildOptions) {

  const { isDev, paths } = options

  return {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\.\w+$/i,
            localIdentName: isDev ? '[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "mixins";',
          sassOptions: {
            includePaths: [paths.styles],
          },
        },
      },
    ],
  }
}