import { notFound } from "next/navigation";
import * as React from "react";
import { Metadata } from "next";

import BlogArticle from "@/components/BlogArticle";
import blogData from "@/data/blog.json";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const article = blogData.articles.find((article) => article.id === params.id);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  const canonicalUrl = `https://brutonet.fr/blog/${article.id}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      url: canonicalUrl,
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
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function Page({ params }: any) {
  const { id } = params;

  const article = blogData.articles.find((article) => article.id === id);

  if (!article) {
    notFound(); // no return needed, Next.js will handle
  }

  return (
    <BlogArticle
      date={article.date || ""}
      image={article.image || ""}
      introduction={article.content.introduction}
      sections={article.content.sections || []}
      title={article.title}
      url={`/blog/${article.id}`}
    />
  );
}
