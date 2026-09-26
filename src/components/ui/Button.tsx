import { ChevronRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'onDark'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'md' | 'lg'
  chevron?: boolean
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-white hover:bg-forest-soft active:bg-forest-deep',
  secondary: 'border-2 border-forest bg-white text-forest hover:bg-sage active:bg-sage-deep',
  onDark: 'bg-leaf text-forest-deep hover:bg-[#74c451] active:bg-[#58a437]',
}

const sizes = {
  md: 'min-h-12 px-5 py-2.5 text-base',
  lg: 'min-h-14 px-7 py-3 text-lg',
}

export default function Button({ variant = 'primary', size = 'md', chevron = true, className = '', children, ...rest }: Props) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
      {chevron && <ChevronRight className="size-5 shrink-0" aria-hidden="true" />}
    </button>
  )
}
