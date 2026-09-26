import { site } from '../config/site'

interface Props {
  variant?: 'colour' | 'white'
  className?: string
  /** The header logo is above the fold; everything else can lazy load. */
  priority?: boolean
}

const files = {
  colour: { webp: '/brand/clearup-logo.webp', png: '/brand/clearup-logo.png' },
  white: { webp: '/brand/clearup-logo-white.webp', png: '/brand/clearup-logo-white.png' },
}

/** The supplied brand artwork. Never rebuilt in text so the leaf and proportions stay intact. */
export default function Logo({ variant = 'colour', className = '', priority = false }: Props) {
  const file = files[variant]
  const size = variant === 'white' ? { width: 480, height: 198 } : { width: 640, height: 250 }
  return (
    <picture>
      <source srcSet={file.webp} type="image/webp" />
      <img
        src={file.png}
        alt={`${site.name}, ${site.tagline}`}
        className={`w-auto ${className}`}
        {...size}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
