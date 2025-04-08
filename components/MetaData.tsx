import Head from "next/head";

interface MetaDataProps {
  title: string;
  description: string;
  image: string;
  url: string;
  date?: string;
  author?: string;
  keywords?: string;
  type?: string;
}

export default function MetaData({
  title,
  description,
  image,
  url,
  date,
  author = "Brutonet",
  keywords = "salaire, brut, net, calcul, smic, finance, emploi, carrière",
  type = "article"
}: MetaDataProps) {
  const fullUrl = `https://brutonet.fr${url}`;
  const siteName = "Brutonet - Calculateur de Salaire Brut/Net";

  return (
    <Head>
      {/* Balises meta de base */}
      <title>{title} | {siteName}</title>
      <meta content={description} name="description" />
      <meta content={author} name="author" />
      <meta content={keywords} name="keywords" />
      {date && <meta content={date} name="date" />}
      <meta content="fr" httpEquiv="content-language" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

      {/* Open Graph / Facebook */}
      <meta content={type} property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={fullUrl} property="og:url" />
      <meta content={siteName} property="og:site_name" />
      <meta content="fr_FR" property="og:locale" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={image} name="twitter:image" />
      <meta content="@brutonet" name="twitter:creator" />

      {/* Balises supplémentaires pour le SEO */}
      <meta content="index, follow, max-image-preview:large" name="robots" />
      <link href={fullUrl} rel="canonical" />
      <link href="/sitemap.xml" rel="sitemap" type="application/xml" />
      <link href="/rss.xml" rel="alternate" type="application/rss+xml" />

      {/* Balises pour les articles */}
      <meta content={date} property="article:published_time" />
      <meta content={author} property="article:author" />
      <meta content="Finance" property="article:section" />
      <meta content="https://brutonet.fr" property="article:tag" />
      
      {/* Balises pour les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Head>
  );
}
