import { type ReactNode, useMemo, type FC, useState, useCallback } from 'react'
import { CarouselContext, CarouselContextValue, SlideType } from './CarouselContext'

interface CarouselProps {
  children: ReactNode
  slidesToShow?: number | 'auto'
  slidesToScroll?: number
  loop?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
}

export const Carousel: FC<CarouselProps> = (props) => {
  const { children, slidesToShow, slidesToScroll, loop, align, className } = props

  const [slides, setSlides] = useState<SlideType[]>([])

  const addSlide = useCallback((slide: SlideType) => {
    setSlides((prev) => [...prev, slide])
  }, [])

  const removeSlide = useCallback((slide: SlideType) => {
    setSlides((prev) => prev.filter((s) => s !== slide))
  }, [])

  const contextValue: CarouselContextValue = useMemo(
    () => ({
      slides,
      addSlide,
      removeSlide,
    }),
    [slides, addSlide, removeSlide]
  )

  return <CarouselContext.Provider value={contextValue}>{children}</CarouselContext.Provider>
}
