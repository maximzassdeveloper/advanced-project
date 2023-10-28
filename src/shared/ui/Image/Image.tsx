import { FC, ImgHTMLAttributes, memo, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { Spinner } from '../Spinner'
import s from './image.module.scss'

type ImageStatus = 'loading' | 'error' | 'normal'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  placeholder?: string
}

export const Image: FC<ImageProps> = memo((props) => {
  const { src, alt, className, placeholder, ...rest } = props
  const [status, setStatus] = useState<ImageStatus>('normal')

  const isValidSrc = (src: string) => {
    return new Promise<boolean>((resolve) => {
      const img = document.createElement('img')
      img.onerror = () => resolve(false)
      img.onload = () => resolve(true)
      img.src = src
    })
  }

  useEffect(() => {
    if (!src) return

    let isActualSrc = true
    isValidSrc(src).then((isValid) => {
      if (!isValid && isActualSrc) {
        setStatus('error')
      }
    })

    return () => {
      isActualSrc = false
    }
  }, [src])

  useEffect(() => {
    if (src) {
      setStatus('loading')
    }
  }, [src])

  const onImageRef = (img: HTMLImageElement | null) => {
    if (!img) return

    if (img.complete && (img.naturalWidth > 0 || img.naturalHeight > 0)) {
      setStatus('normal')
    }
  }

  return (
    <div className={classNames(s.image, className)}>
      {/* {status === 'loading' && (
        <div className={s.placeholder}>
          <Spinner className={s.spinner} />
        </div>
      )} */}
      <img
        ref={onImageRef}
        src={status === 'error' ? placeholder : src}
        alt={alt}
        {...rest}
      />
    </div>
  )
})
