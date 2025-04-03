import Link from "next/link";
import Script from "next/script";

import MetaData from "./MetaData";

import { title, subtitle } from "@/components/primitives";

interface Section {
  title: string;
  content?: string;
  list?: string[];
}

interface BlogArticleProps {
  title: string;
  introduction: string;
  sections: Section[];
  image: string;
  date: string;
  url: string;
}

export default function BlogArticle({
  title: articleTitle,
  introduction,
  sections,
  image,
  date,
  url,
}: BlogArticleProps) {
  // Format date for schema
  const formattedDate = new Date(date).toISOString();

  return (
    <>
      <MetaData
        date={date}
        description={introduction}
        image={image}
        title={articleTitle}
        url={url}
      />

      <Script id="article-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${articleTitle}",
            "image": "${image}",
            "datePublished": "${formattedDate}",
            "dateModified": "${formattedDate}",
            "author": {
              "@type": "Organization",
              "name": "Brutonet",
              "url": "https://brutonet.fr"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Brutonet",
              "logo": {
                "@type": "ImageObject",
                "url": "https://brutonet.fr/logo.png"
              }
            },
            "description": "${introduction}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://brutonet.fr${url}"
            }
          }
        `}
      </Script>

      <article className="max-w-4xl mx-auto px-2 py-1 justify-center">
        {/* Rectangle de titre */}
        <div className="inline-block text-center justify-center p-1 rounded-xl">
          <h1 className={title()}>{articleTitle}</h1>
          <div className={subtitle({ class: "mt-5" })}>{introduction}</div>
          <time className="text-gray-500 mt-4 block" dateTime={date}>
            {new Date(date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Image de l'article */}
        <figure className="mt-8 mb-12 relative h-[400px] w-full rounded-xl overflow-hidden">
          <img
            alt={articleTitle}
            className="w-full h-full object-cover"
            src={image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </figure>

        <div className="mt-8 prose prose-lg">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold mt-6 mb-4">{section.title}</h2>
              {section.content && <p>{section.content}</p>}
              {section.list && (
                <ul className="list-disc pl-6">
                  {section.list.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 mb-12 text-center">
          <Link className="inline-block" href="/">
            <button className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-[#FF1CF7] via-[#FF705B] to-[#5EA2EF] text-white hover:opacity-90 transition-opacity shadow-lg">
              Calculer mon salaire net
            </button>
          </Link>
        </div>
      </article>
    </>
  );
}
