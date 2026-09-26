import { Sparkles } from 'lucide-react'
import { servicePage } from '../config/content'

/**
 * Answer-first summary block placed straight after the hero. Marked up so it
 * can be quoted directly by search engines and AI assistants (speakable).
 */
export default function QuickAnswer({ text }: { text: string }) {
  return (
    <section aria-label={servicePage.quickAnswerLabel} className="bg-white">
      <div className="container-site py-8 sm:py-10">
        <div className="flex gap-4 rounded-r-card rounded-l-md border-l-4 border-leaf bg-sage/60 p-5 sm:p-6">
          <Sparkles className="mt-1 size-5 shrink-0 text-leaf-text" aria-hidden="true" />
          <p id="quick-answer" className="max-w-3xl text-[1.0625rem] leading-relaxed text-ink">
            <strong className="font-bold text-forest-deep">{servicePage.quickAnswerLabel}: </strong>
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
