/**
 * Schema.org builders para NextSwift.
 * Importar solo en páginas que necesiten LocalBusiness o Service.
 * Organization se emite desde Base.astro (footer-level, todas las páginas).
 */

export const SITE = 'https://www.nextswift.mx';

export interface ServiceSchemaOpts {
  name: string;
  description: string;
  slug: string;
}

/** Service schema para landings de dolor y /acelerador. */
export function buildServiceSchema({ name, description, slug }: ServiceSchemaOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'NextSwift',
      url: SITE,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Dueños de restaurantes pequeños y medianos en México',
    },
    url: `${SITE}/${slug}`,
  };
}

/** LocalBusiness schema — emitir SOLO en /index. */
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#localbusiness`,
    name: 'NextSwift',
    description:
      'Consultoría B2B que rehabilita restaurantes que venden pero no ganan dinero. Diagnóstico, plan y ejecución en 10 días hábiles. 11 garantías formales.',
    url: SITE,
    logo: `${SITE}/images/logo-nextswift.webp`,
    telephone: '+52-811-042-5674',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Monterrey',
      addressRegion: 'Nuevo León',
      addressCountry: 'MX',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  };
}
