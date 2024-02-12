import type { StorybookConfig } from '@storybook/react-webpack5'
import { DefinePlugin } from 'webpack'
import { buildStyleLoader } from 'config/build/loaders/buildStyleLoader'
import { buildSvgLoader } from 'config/build/loaders/buildSvgLoader'
import { BuildOptions } from 'config/build/types/config'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: (config, options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),

  webpackFinal: (config) => {
    const paths: any = {
      src: path.resolve(__dirname, '..', '..', 'src'),
      styles: path.resolve(__dirname, '..', '..', 'src', 'app', 'styles'),
    }

    config.resolve.modules?.push(paths.src)
    config.resolve.extensions?.push('.ts', '.tsx')
    config.resolve.alias = {
      '@': paths.src,
    }

    config.module.rules.push(buildSvgLoader())
    config.module.rules.push(buildStyleLoader({ isDev: true, paths } as BuildOptions))

    config.plugins.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API_URL__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
      })
    )

    return config
  },
}
export default config
