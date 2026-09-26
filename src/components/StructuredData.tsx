import { useRoute } from '../lib/router'
import { schemaFor } from '../lib/schema'

/** JSON-LD for the current page. Built from config; see src/lib/schema.ts. */
export default function StructuredData() {
  const path = useRoute()
  const json = JSON.stringify(schemaFor(path)).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
