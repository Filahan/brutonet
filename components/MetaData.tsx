import Head from "next/head";

interface MetaDataProps {
  title: string;
  description: string;
  image: string;
  url: string;
  date?: string;
  author?: string;
}

export default function MetaData({
  title,
  description,
  image,
  url,
  date,
  author = "Brutonet",
}: MetaDataProps) {
  const fullUrl = `https://brutonet.fr${url}`;

  return (
    <Head>
      {/* Balises meta de base */}
      <title>{title} | Brutonet</title>
      <meta content={description} name="description" />
      <meta content={author} name="author" />
      {date && <meta content={date} name="date" />}

      {/* Open Graph / Facebook */}
      <meta content="article" property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={fullUrl} property="og:url" />
      <meta content="Brutonet" property="og:site_name" />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={image} name="twitter:image" />

      {/* Balises supplémentaires pour le SEO */}
      <meta content="index, follow" name="robots" />
      <link href={fullUrl} rel="canonical" />

      {/* Balises pour les articles */}
      <meta content={date} property="article:published_time" />
      <meta content={author} property="article:author" />
      <meta content="Finance" property="article:section" />
    </Head>
  );
}
