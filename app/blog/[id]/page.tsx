import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';
import blogData from '@/data/blog.json';
import * as React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';



export async function generateMetadata({ params }: any): Promise<Metadata> {
  const article = blogData.articles.find((article) => article.id === params.id);
  
  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }
  
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      url: `https://brutonet.fr/blog/${article.id}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const article = blogData.articles.find((article) => article.id === id);

  if (!article) {
    notFound(); // no return needed, Next.js will handle
  }

  return (
    <BlogArticle
      title={article.title}
      introduction={article.content.introduction}
      sections={article.content.sections || []}
      image={article.image || ''}
      date={article.date || ''}
      url={`/blog/${article.id}`}
    />
  );
}
