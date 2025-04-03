import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';
import blogData from '@/data/blog.json';

// Cette fonction génère les paramètres statiques pour chaque article
export async function generateStaticParams() {
  return Promise.resolve(blogData.articles.map((article) => ({
    id: article.id,
  })));
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function BlogPage(props: Props) {
  const article = blogData.articles.find((article) => article.id === props.params.id);

  if (!article) {
    notFound();
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