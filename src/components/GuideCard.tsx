import { ArrowRight, BookOpen } from 'lucide-react'
import type { Guide } from '../config/guides'
import { routes } from '../config/routes'
import { Link } from '../lib/router'

/** Whole card is the link, with an explicit "Read guide" cue. */
export default function GuideCard({ guide, large = false }: { guide: Guide; large?: boolean }) {
  return (
    <Link
      to={routes.guide(guide.slug)}
      className="group flex h-full flex-col rounded-card border border-line bg-sage/50 p-6 transition-colors motion-reduce:transition-none hover:border-forest hover:bg-sage focus-visible:border-forest"
    >
      <BookOpen className="size-6 text-leaf-text" aria-hidden="true" />
      <h3 className={`mt-3 font-extrabold text-forest-deep group-hover:underline group-hover:underline-offset-4 ${large ? 'text-2xl' : 'text-xl'}`}>{guide.title}</h3>
      <p className="mt-2 text-muted">{guide.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-bold text-forest">
        Read guide
        <ArrowRight className="size-4 transition-transform motion-reduce:transition-none group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}
