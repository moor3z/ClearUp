import type { ServiceId } from './services'
import type { Testimonial } from './reviews'

/**
 * Completed jobs. Leave empty until there are real ones with photos. The
 * /projects/ hub and each /projects/<slug>/ page appear only when this has
 * entries, and every field below is optional apart from the first five.
 *
 * Photo filenames should describe the job, e.g.
 *   /projects/garden-clearance-chester-hoole-before.webp
 */

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  serviceId: Exclude<ServiceId, 'other'>
  areaSlug: string
  /** ISO date the job was completed */
  date: string
  description: string
  beforeImages?: ProjectImage[]
  afterImages?: ProjectImage[]
  materialsRemoved?: string[]
  /** e.g. 'About two van loads' */
  approximateVolume?: string
  crewSize?: number
  /** e.g. 'Half a day' */
  completionTime?: string
  recyclingInformation?: string
  testimonial?: Testimonial
}

export const projects: Project[] = []

export const findProject = (slug: string) => projects.find((p) => p.slug === slug)
