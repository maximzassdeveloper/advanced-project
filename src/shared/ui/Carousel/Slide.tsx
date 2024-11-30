import { type ReactNode, type FC, useEffect, useId } from 'react'
import { useCarouselContext } from './CarouselContext'

interface SlideProps {
  children?: ReactNode
  className?: string
}

export const Slide: FC<SlideProps> = (props) => {
  const { children, className } = props
  const { addSlide, removeSlide } = useCarouselContext()
  const id = useId()

  useEffect(() => {
    addSlide(id)

    return () => {
      removeSlide(id)
    }
  }, [addSlide, removeSlide, id])

  return <div className={className}>{children}</div>
}
