declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare const __IS_DEV__: boolean
declare const __API_URL__: string
