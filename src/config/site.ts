/**
 * Business details for ClearUp.
 *
 * Everything the site does not yet know about the business lives here.
 * Leave a value as an empty string (or empty array) and the site will
 * simply not show it. Nothing on the page is invented from placeholders.
 */

export const site = {
  name: 'ClearUp',
  /** Registered company name if different from the trading name, e.g. 'Example Ltd'. */
  legalName: '',
  tagline: 'Garden Clearance Specialists',

  /**
   * Public URL once live, e.g. 'https://clearup.example'. Needed for canonical
   * links, Open Graph images, sitemap.xml, llms.txt and absolute schema IDs.
   * Set it here or pass VITE_SITE_URL at build time.
   */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',

  seo: {
    title: 'ClearUp | Garden Clearance Specialists',
    description:
      'Garden clearance across Chester, Flintshire, Wrexham and the Wirral. Overgrown gardens cut back, loaded and taken away. Request your free quote.',
    /** 1200 x 630 social sharing image, relative to the site root. */
    ogImage: '/brand/og-image.png',
    /** One-paragraph plain-English description of the business for AI assistants and llms.txt. */
    aiSummary:
      'ClearUp is a garden clearance company covering Chester, Cheshire, Flintshire, Wrexham, Denbighshire and the Wirral. Services: garden clearance, green waste removal, end of tenancy garden clearance, site and land clearance, and shed clearance and dismantling. Loading is included and all waste is taken away. Quotes are free and requested through the website form, ideally with photos.',
  },

  /**
   * Local business details for schema.org markup. Every field is optional and
   * only emitted when filled in. Nothing here is guessed.
   */
  local: {
    /** Street address for the LocalBusiness. Leave blank if you do not want an address published. */
    address: {
      streetAddress: '',
      addressLocality: '',
      addressRegion: '',
      postalCode: '',
      addressCountry: 'GB',
    },
    /** Business location coordinates (only used when the address is filled in). */
    geo: { latitude: '', longitude: '' },
    /** schema.org opening hours, e.g. ['Mo-Fr 08:00-18:00', 'Sa 08:00-13:00']. */
    openingHours: [] as string[],
    /** Google Business Profile, Facebook, Instagram, Checkatrade etc. Full URLs. */
    sameAs: [] as string[],
    /** Google Maps link for hasMap. */
    mapUrl: '',
  },

  /** Verified contact details. Leave blank until confirmed. */
  contact: {
    phone: '', // e.g. '01234 567890'
    email: '', // e.g. 'hello@clearup.example'
    /** WhatsApp link, e.g. 'https://wa.me/447700900000'. Adds a WhatsApp button wherever CTAs appear. */
    whatsapp: '',
    hours: '', // e.g. 'Mon to Sat, 8am to 6pm'
  },

  /** Registered business details. Leave blank until confirmed. */
  legal: {
    tradingName: '', // e.g. 'ClearUp is a trading name of Example Ltd'
    companyNumber: '',
    vatNumber: '',
    registeredAddress: '',
    /** Environment Agency / NRW waste carrier registration, e.g. 'CBDU123456'. Enables /waste-licence/. */
    wasteCarrierNumber: '',
    /** Which register the number is on, e.g. 'Environment Agency' or 'Natural Resources Wales'. */
    wasteCarrierRegister: '',
  },

  /**
   * Trust facts shown on the About page, service pages and the footer. Each
   * one is shown only when filled in. Never guess these.
   */
  trust: {
    /** e.g. 'Public liability insurance in place' or the insurer and cover amount. */
    insurance: '',
    /** e.g. 'Trading since 2019'. */
    trading: '',
    /** Plain statement of what happens to collected waste. Enables /recycling/. */
    disposalStatement: '',
    /** e.g. 'Fully uniformed team' or other verifiable points. */
    other: [] as string[],
  },

  /**
   * Legal pages. Add entries once the pages exist so the footer never links to
   * a dead page, e.g. { label: 'Privacy policy', href: '/privacy' }.
   */
  legalLinks: [] as { label: string; href: string }[],

  /** Service areas live in src/config/areas.ts (each gets its own page). */

  /**
   * Enquiry form delivery.
   *
   * - 'endpoint': Posts to `endpointUrl`. On Cloudflare Pages that is the
   *               bundled function at /api/enquiry (functions/api/enquiry.js),
   *               which emails the enquiry via Resend once its environment
   *               variables are set. Until then it returns an honest error.
   * - 'demo':     Nothing is sent. The form validates and shows a clear demo notice.
   * - 'netlify':  Posts to Netlify Forms (only if hosted on Netlify).
   */
  enquiry: {
    provider: 'endpoint' as 'demo' | 'netlify' | 'endpoint',
    endpointUrl: '/api/enquiry',
    /** Photo upload limits shown to visitors and enforced client side. */
    photos: {
      maxFiles: 6,
      maxSizeMb: 8,
      acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'] as string[],
      acceptedLabel: 'JPG, PNG or WEBP',
    },
  },
}

export type SiteConfig = typeof site
