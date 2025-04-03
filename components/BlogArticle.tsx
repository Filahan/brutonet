import { title, subtitle } from "@/components/primitives";
import MetaData from "./MetaData";

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
  url
}: BlogArticleProps) {
  return (
    <>
      <MetaData
        title={articleTitle}
        description={introduction}
        image={image}
        url={url}
        date={date}
      />
      
      <article className="max-w-4xl mx-auto px-2 py-1 justify-center">
        {/* Rectangle de titre */}
        <div className="inline-block text-center justify-center p-1 rounded-xl">
          <h1 className={title()}>{articleTitle}</h1>
          <div className={subtitle({ class: "mt-5" })}>
            {introduction}
          </div>
          <time dateTime={date} className="text-gray-500 mt-4 block">
            {new Date(date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {/* Image de l'article */}
        <figure className="mt-8 mb-12 relative h-[400px] w-full rounded-xl overflow-hidden">
          <img
            src={image}
            alt={articleTitle}
            className="w-full h-full object-cover"
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
      </article>
    </>
  );
} 