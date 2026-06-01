/**
 * Per-page SEO via React 19 native document metadata: <title>/<meta> rendered
 * anywhere are hoisted into <head>. No helmet dependency needed.
 * (When migrating to Shopify/SSR, swap for the framework's head API.)
 */

interface SeoProps {
  title?: string
  description?: string
}

const SITE_NAME = 'IMC Motor'
const DEFAULT_TITLE = 'IMC Motor — Vespa · Aprilia · Moto Guzzi · Piaggio | Dunakeszi'
const DEFAULT_DESCRIPTION =
  'IMC Motor Dunakeszi — olasz motorok és robogók márkakereskedése és szakszervize.'

export function Seo({ title, description }: SeoProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE
  const desc = description ?? DEFAULT_DESCRIPTION
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
    </>
  )
}
