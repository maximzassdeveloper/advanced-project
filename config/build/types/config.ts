import { Configuration } from 'webpack'

export type BuildMode = Configuration['mode']

export interface BuildPaths {
	enrty: string
	output: string
	html: string
	src: string
}

export interface BuildOptions {
	mode: BuildMode
	paths: BuildPaths
	isDev: boolean
	port: number
}

export interface BuildEnv {
	mode: BuildMode
	port: number
}
