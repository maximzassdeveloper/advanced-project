import { BuildOptions } from '../types/config'

interface BuildBabelLoaderOptions extends BuildOptions {
  isTsx: boolean
}

export function buildBabelLoader(options: BuildBabelLoaderOptions) {
  const { isTsx } = options

  return {
    test: isTsx ? /\.(jsx?|tsx?)$/ : /\.(js?|ts?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
          ['@babel/preset-typescript', { isTsx }],
        ],
      },
    },
  }
}
