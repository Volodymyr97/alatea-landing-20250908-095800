import Script from 'next/script';

export function JsonLd() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alatea Group',
    url,
    logo: '/icon-192.png',
    sameAs: [],
  };
  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Alatea Group',
    url,
    slogan: 'Your strategic growth partner',
    areaServed: 'Global',
    serviceType: ['Market expansion','eCommerce launch','Negotiation support','GTM advisory'],
  };
  return (<>
    <Script id="org-ldjson" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(org)}
    </Script>
    <Script id="service-ldjson" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(service)}
    </Script>
  </>);
}
