import * as React from 'react'

// Bundle-time shim for `next/image` (no Next runtime in the bare bundle).
// Renders the underlying <img> that next/image ultimately produces.
type Props = {
  src?: unknown
  alt?: string
  width?: number | string
  height?: number | string
} & React.ImgHTMLAttributes<HTMLImageElement>
const Image = ({ src, alt = '', width, height, ...rest }: Props) => {
  const s = typeof src === 'string' ? src : (src as { src?: string } | undefined)?.src
  return <img src={s} alt={alt} width={width as number} height={height as number} {...rest} />
}
export default Image
