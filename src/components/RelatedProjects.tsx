import { areas } from '../config/areas'
import { projects } from '../config/projects'
import { routes } from '../config/routes'
import { services, type ServiceId } from '../config/services'
import { Link } from '../lib/router'
import { CardGrid, CardItem } from './ui/CardGrid'
import SectionHeading from './ui/SectionHeading'

interface Props {
  serviceId?: ServiceId
  areaSlug?: string
  limit?: number
}

/** Completed jobs near this page's subject. Renders nothing until projects exist. */
export default function RelatedProjects({ serviceId, areaSlug, limit = 3 }: Props) {
  const list = projects
    .filter((p) => (!serviceId || p.serviceId === serviceId) && (!areaSlug || p.areaSlug === areaSlug))
    .slice(0, limit)
  if (!list.length) return null
  return (
    <section aria-labelledby="projects-heading" className="bg-sage py-16 sm:py-20">
      <div className="container-site">
        <SectionHeading id="projects-heading" title="Recent jobs" />
        <CardGrid cols={3} className="mt-10">
          {list.map((p) => {
            const img = p.afterImages?.[0] ?? p.beforeImages?.[0]
            return (
              <CardItem key={p.slug} cols={3} className="overflow-hidden rounded-card border border-line bg-white">
                {img && <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
                <div className="p-6">
                  <p className="text-sm font-semibold text-leaf-dark">
                    {services.find((s) => s.id === p.serviceId)?.name} · {areas.find((a) => a.slug === p.areaSlug)?.name}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-forest-deep">
                    <Link to={routes.project(p.slug)} className="inline-block py-1 hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                </div>
              </CardItem>
            )
          })}
        </CardGrid>
      </div>
    </section>
  )
}
