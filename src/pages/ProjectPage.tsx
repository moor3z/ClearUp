import Breadcrumb from '../components/Breadcrumb'
import { Section } from '../components/ContentBlocks'
import QuoteCta from '../components/QuoteCta'
import RelatedProjects from '../components/RelatedProjects'
import { areas } from '../config/areas'
import type { Project, ProjectImage } from '../config/projects'
import { routes } from '../config/routes'
import { services } from '../config/services'
import { Link } from '../lib/router'

function Gallery({ label, images }: { label: string; images?: ProjectImage[] }) {
  if (!images?.length) return null
  return (
    <figure className="mt-6">
      <figcaption className="text-lg font-extrabold text-forest-deep">{label}</figcaption>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {images.map((i) => (
          <li key={i.src}>
            <img src={i.src} alt={i.alt} width={i.width} height={i.height} loading="lazy" className="w-full rounded-xl border border-line" />
          </li>
        ))}
      </ul>
    </figure>
  )
}

export default function ProjectPage({ project }: { project: Project }) {
  const service = services.find((s) => s.id === project.serviceId)!
  const area = areas.find((a) => a.slug === project.areaSlug)!
  const facts = [
    ...(project.approximateVolume ? [`Volume: ${project.approximateVolume}`] : []),
    ...(project.crewSize ? [`Crew: ${project.crewSize}`] : []),
    ...(project.completionTime ? [`Time on site: ${project.completionTime}`] : []),
  ]
  return (
    <>
      <Breadcrumb items={[{ label: 'Projects', to: routes.projects }, { label: project.title }]} />
      <article>
        <header className="bg-sage">
          <div className="container-site max-w-3xl py-10 sm:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-dark">
              <Link to={routes.serviceArea(service.slug, area.slug)} className="hover:underline">
                {service.name} in {area.name}
              </Link>
            </p>
            <h1 id="page-heading" className="mt-3 text-balance text-[2.125rem] font-extrabold leading-[1.05] tracking-tight text-forest-deep sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-sm text-muted">
              Completed <time dateTime={project.date}>{new Date(project.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</time>
            </p>
          </div>
        </header>
        <div className="bg-white py-12">
          <div className="container-site max-w-3xl">
            <p id="quick-answer" className="text-lg leading-relaxed text-ink">
              {project.description}
            </p>
            <Gallery label="Before" images={project.beforeImages} />
            <Gallery label="After" images={project.afterImages} />
            {project.materialsRemoved?.length ? <Section section={{ heading: 'What was removed', list: project.materialsRemoved }} /> : null}
            {facts.length > 0 && <Section section={{ heading: 'Job details', list: facts }} />}
            {project.recyclingInformation && <Section section={{ heading: 'Disposal', paragraphs: [project.recyclingInformation] }} />}
            {project.testimonial && (
              <blockquote className="mt-10 rounded-card border-l-4 border-leaf bg-sage/60 p-6 text-ink">
                {project.testimonial.text}
                <footer className="mt-2 text-sm text-muted">
                  {project.testimonial.author}, {project.testimonial.source}
                </footer>
              </blockquote>
            )}
          </div>
        </div>
      </article>
      <RelatedProjects areaSlug={project.areaSlug} />
      <QuoteCta heading={`Similar job in ${area.name}?`} body="Send photos and we will quote." defaultService={project.serviceId} />
    </>
  )
}
