import { Check } from 'lucide-react'
import type { GuideSection, GuideTable } from '../config/guides'

/** A comparison table that stays readable on phones (scrolls inside its own box). */
export function ComparisonTable({ table }: { table: GuideTable }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[36rem] text-left text-[0.95rem]">
        <caption className="sr-only">{table.caption}</caption>
        <thead className="bg-sage">
          <tr>
            {table.columns.map((c, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-bold text-forest-deep">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {table.rows.map((r, i) => (
            <tr key={i} className="align-top">
              {r.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-3 font-semibold text-forest-deep">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-3 text-ink">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Renders a guide/page section: heading, paragraphs, list and table. */
export function Section({ section }: { section: GuideSection }) {
  const List = section.ordered ? 'ol' : 'ul'
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-2xl font-extrabold tracking-tight text-forest-deep sm:text-3xl">{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mt-4 leading-relaxed text-ink">
          {p}
        </p>
      ))}
      {section.list && (
        <List className={`mt-4 space-y-2.5 ${section.ordered ? 'list-decimal pl-6 marker:font-bold marker:text-leaf-text' : ''}`}>
          {section.list.map((item) => (
            <li key={item} className={section.ordered ? 'pl-1 leading-relaxed text-ink' : 'flex items-start gap-2.5 leading-relaxed text-ink'}>
              {!section.ordered && <Check className="mt-1.5 size-4 shrink-0 text-leaf-text" strokeWidth={3} aria-hidden="true" />}
              {item}
            </li>
          ))}
        </List>
      )}
      {section.table && (
        <div className="mt-5">
          <ComparisonTable table={section.table} />
        </div>
      )}
    </section>
  )
}

/** Two-column facts list used on pricing, how it works and about. */
export function FactList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2.5 leading-relaxed text-ink">
          <Check className="mt-1.5 size-4 shrink-0 text-leaf-text" strokeWidth={3} aria-hidden="true" />
          {i}
        </li>
      ))}
    </ul>
  )
}
