import { Configuration } from 'webpack'
import path from 'path'
import { buildStyleLoader } from '../build/loaders/buildStyleLoader'
import { buildSvgLoader } from '../build/loaders/buildSvgLoader'
import { BuildOptions, BuildPaths } from '../build/types/config'

type StorybookBuildPaths = Pick<BuildPaths, 'src' | 'styles'>

export default ({ config }: { config: Configuration }) => {
  const paths: StorybookBuildPaths = {
    src: path.resolve(__dirname, '..', '..', 'src'),
    styles: path.resolve(__dirname, '..', '..', 'src', 'app', 'styles'),
  }

  if (config.resolve) {
    config.resolve.modules?.push(paths.src)
    config.resolve.extensions?.push('.ts', '.tsx')
    config.resolve.alias = {
      '@': paths.src,
    }
  }

  if (config.module?.rules) {
    const fileLoaderRule: any = config.module.rules.find((rule: any) => rule?.test.test('.svg'))
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/
    }

    config.module.rules.push(buildSvgLoader())
    config.module.rules.push(
      buildStyleLoader({
        isDev: true,
        paths,
      } as BuildOptions)
    )
  }

  return config
}
