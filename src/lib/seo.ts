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
    // Referencia por @id a la Organization emitida en Base.astro (todas las
    // páginas). Consolida la autoridad de la entidad en lugar de declarar un
    // nodo Organization suelto y duplicado.
    provider: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
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
      'Partner operativo B2B para restaurantes de 50-150 comensales que venden pero no ganan dinero. Diagnóstico, plan y ejecución en 10 días hábiles. 11 garantías formales.',
    url: SITE,
    logo: `${SITE}/images/logo-nextswift.webp`,
    telephone: '+52-811-042-5674',
    address: {
      '@type': 'PostalAddress',
      // TODO(Efer): añadir streetAddress + postalCode reales para completar la
      // ficha de LocalBusiness. NO inventar — mientras tanto se emite solo
      // localidad/región/país, que ya es válido para Google.
      addressLocality: 'Monterrey',
      addressRegion: 'Nuevo León',
      addressCountry: 'MX',
    },
    // TODO(Efer): añadir "geo" con GeoCoordinates reales una vez confirmada la
    // dirección. NO inventar coordenadas. Estructura objetivo:
    //   geo: { '@type': 'GeoCoordinates', latitude: <num>, longitude: <num> },
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
