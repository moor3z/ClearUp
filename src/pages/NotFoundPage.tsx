import Button from '../components/ui/Button'
import { notFound } from '../config/content'
import { routes } from '../config/routes'
import { Link } from '../lib/router'
import QuoteCta from '../components/QuoteCta'

export default function NotFoundPage() {
  return (
    <>
      <section aria-labelledby="page-heading" className="bg-sage">
        <div className="container-site py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 id="page-heading" className="text-[2.5rem] font-extrabold leading-tight tracking-tight text-forest-deep sm:text-5xl">
              {notFound.heading}
            </h1>
            <p className="mt-5 text-lg text-muted sm:text-xl">{notFound.body}</p>
            <Link to={routes.home} className="mt-8 inline-block rounded-xl">
              <Button size="lg" tabIndex={-1}>
                {notFound.cta}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <QuoteCta heading="Or send us a quote request" body="Tell us what needs clearing and we will be in touch." />
    </>
  )
}
