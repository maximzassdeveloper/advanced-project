import { createContext, useContext } from 'react'

export type SlideType = string

export interface CarouselContextValue {
  slides: SlideType[]
  addSlide: (slide: SlideType) => void
  removeSlide: (slide: SlideType) => void
}

export const CarouselContext = createContext({} as CarouselContextValue)
export const useCarouselContext = () => useContext(CarouselContext)
