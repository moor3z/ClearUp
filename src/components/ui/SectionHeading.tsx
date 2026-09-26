interface Props {
  id?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export default function SectionHeading({ id, title, intro, align = 'center', dark = false }: Props) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <h2
        id={id}
        className={`text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? 'text-white' : 'text-forest-deep'}`}
      >
        {title}
      </h2>
      <span aria-hidden="true" className={`mt-4 block h-1 w-14 rounded-full bg-leaf ${align === 'center' ? 'mx-auto' : ''}`} />
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/85' : 'text-muted'}`}>{intro}</p>}
    </div>
  )
}
