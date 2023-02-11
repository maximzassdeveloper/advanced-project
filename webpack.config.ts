import path from 'path'
import { Configuration } from 'webpack'
import { buildWebpackConfig } from './config/build/BuildWebpackConfig'
import { BuildEnv } from './config/build/types/config'

export default (env: BuildEnv) => {
  const mode = env.mode || 'development'
  const PORT = env.port || 3000

  const isDev = mode === 'development'

  const config: Configuration = buildWebpackConfig({
    mode,
    isDev,
    paths: {
      enrty: path.resolve(__dirname, 'src', 'index.tsx'),
      output: path.resolve(__dirname, 'build'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
      styles: path.resolve(__dirname, 'src', 'app', 'styles'),
    },
    port: PORT,
  })

  return config
}
