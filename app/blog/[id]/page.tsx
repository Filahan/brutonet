import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';
import blogData from '@/data/blog.json';

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const article = blogData.articles.find((article) => article.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <BlogArticle
      title={article.title}
      introduction={article.content.introduction}
      sections={article.content.sections}
      image={article.image}
      date={article.date}
      url={`/blog/${article.id}`}
    />
  );
} 