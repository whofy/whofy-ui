import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  const fullTitle = title ? `${title} | Whofy` : 'Whofy - We hunt opportunity for you';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
