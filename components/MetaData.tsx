import Head from 'next/head';

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
  author = "Brutonet" 
}: MetaDataProps) {
  const fullUrl = `https://brutonet.fr${url}`;
  
  return (
    <Head>
      {/* Balises meta de base */}
      <title>{title} | Brutonet</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {date && <meta name="date" content={date} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Brutonet" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Balises supplémentaires pour le SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Balises pour les articles */}
      <meta property="article:published_time" content={date} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content="Finance" />
    </Head>
  );
} 