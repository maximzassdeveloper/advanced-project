import { Configuration } from 'webpack'

export type BuildMode = Configuration['mode']

export interface BuildPaths {
  enrty: string
  output: string
  html: string
  src: string
  styles: string
  i18nextLocales: string
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPaths
  isDev: boolean
  port: number
  analyze: boolean
  apiUrl: string
  project: 'frontend' | 'storybook' | 'jest'
}

export interface BuildEnv {
  mode: BuildMode
  port: number
  analyze: boolean
  apiUrl: string
}
