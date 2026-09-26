import type { ReactNode } from 'react'

/**
 * A wrapping card layout that never leaves an empty slot: items grow to fill
 * the last row, so five cards in three columns become 3 + 2, and five cards
 * in two columns become 2 + 2 + 1 full width.
 */
const basis = {
  2: 'md:basis-[calc(50%-0.625rem)]',
  3: 'md:basis-[calc(50%-0.625rem)] xl:basis-[calc(33.333%-0.834rem)]',
  4: 'sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(25%-0.9375rem)]',
} as const

export function CardGrid({ cols = 3, className = '', children, as: Tag = 'ul', ...rest }: { cols?: 2 | 3 | 4; className?: string; children: ReactNode; as?: 'ul' | 'dl' | 'div'; 'aria-label'?: string }) {
  return (
    <Tag className={`flex flex-wrap gap-5 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function CardItem({ cols = 3, className = '', children, as: Tag = 'li' }: { cols?: 2 | 3 | 4; className?: string; children: ReactNode; as?: 'li' | 'div' }) {
  return <Tag className={`flex min-w-0 flex-1 basis-full flex-col ${basis[cols]} ${className}`}>{children}</Tag>
}
