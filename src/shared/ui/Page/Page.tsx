import { FC, ReactNode, memo } from 'react'

interface PageProps {
  children: ReactNode
}

export const Page: FC<PageProps> = memo((props) => {
  const { children } = props

  return <main>{children}</main>
})
