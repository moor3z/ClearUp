import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MobileCtaBar from './components/MobileCtaBar'
import StructuredData from './components/StructuredData'
import { matchRoute, pageMeta } from './lib/seo'
import { RouterProvider, useRoute } from './lib/router'
import AreaPage from './pages/AreaPage'
import GuidePage from './pages/GuidePage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectPage from './pages/ProjectPage'
import ServiceAreaPage from './pages/ServiceAreaPage'
import ServicePage from './pages/ServicePage'
import {
  AboutPage,
  AreasHubPage,
  ContactPage,
  GuidesHubPage,
  HowItWorksPage,
  PricingPage,
  ProjectsHubPage,
  RecyclingPage,
  ReviewsHubPage,
  ServicesHubPage,
  WasteLicencePage,
} from './pages/StaticPages'

function Page() {
  const path = useRoute()

  useEffect(() => {
    const meta = pageMeta(path)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [path])

  const m = matchRoute(path)
  switch (m.kind) {
    case 'home':
      return <HomePage />
    case 'service':
      return <ServicePage service={m.service} />
    case 'serviceArea':
      return <ServiceAreaPage service={m.service} area={m.area} />
    case 'servicesHub':
      return <ServicesHubPage />
    case 'areasHub':
      return <AreasHubPage />
    case 'area':
      return <AreaPage area={m.area} />
    case 'howItWorks':
      return <HowItWorksPage />
    case 'pricing':
      return <PricingPage />
    case 'about':
      return <AboutPage />
    case 'contact':
      return <ContactPage />
    case 'guidesHub':
      return <GuidesHubPage />
    case 'guide':
      return <GuidePage guide={m.guide} />
    case 'projectsHub':
      return <ProjectsHubPage />
    case 'project':
      return <ProjectPage project={m.project} />
    case 'reviews':
      return <ReviewsHubPage />
    case 'recycling':
      return <RecyclingPage />
    case 'wasteLicence':
      return <WasteLicencePage />
    default:
      return <NotFoundPage />
  }
}

export default function App({ path }: { path: string }) {
  return (
    <RouterProvider initialPath={path}>
      <a
        href="#quote-form"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-3 focus:font-bold focus:text-white"
      >
        Skip to the quote form
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none pb-20 sm:pb-0">
        <Page />
      </main>
      <Footer />
      <MobileCtaBar />
      <StructuredData />
    </RouterProvider>
  )
}
