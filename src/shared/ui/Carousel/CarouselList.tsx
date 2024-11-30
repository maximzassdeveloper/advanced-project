import { type ReactNode, type FC } from 'react'

interface CarouselListProps {
  children?: ReactNode
  className?: string
}

export const CarouselList: FC<CarouselListProps> = (props) => {
  const { children, className } = props

  return <div className={className}>{children}</div>
}
