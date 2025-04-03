import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';
import blogData from '@/data/blog.json';
import * as React from 'react'


export default async function Page({ params }:any) {
 const { id } = await params

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
