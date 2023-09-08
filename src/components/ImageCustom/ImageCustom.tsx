import style from './imgageCustom.module.scss'
import { Image } from 'antd'

import { imageFallback } from '~/constants/utils'

type TImage = {
  src: string
  size?: string
  width: string
  preview?: boolean
  className?: string
  styles?: React.CSSProperties
  height?: string
  onClick?: () => void
}

export default function ImageCustom({ src, size, width, preview, height, className, styles, onClick }: TImage) {
  return (
    <div className={style.classImage}>
      <Image
        onClick={onClick}
        style={styles}
        className={className}
        height={height}
        preview={preview}
        src={src}
        fallback={imageFallback}
        sizes={size}
        width={width}
      />
    </div>
  )
}
