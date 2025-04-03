"use client";

import { useRef, useState } from "react";

import BlogCard from "./BlogCard";

interface HorizontalBlogListProps {
  articles: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
}

export default function HorizontalBlogList({
  articles,
}: HorizontalBlogListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Ajustez cette valeur selon vos besoins
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const shouldShowArrows = articles.length >= 4;

  return (
    <div className="relative">
      {/* Conteneur de défilement */}
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto gap-4 pb-4 scrollbar-hide ${articles.length < 4 ? "justify-center" : ""}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={checkScroll}
      >
        {articles.map((article) => (
          <div key={article.id} className="flex-none w-[300px]">
            <BlogCard
              description={article.description}
              id={article.id}
              image={article.image}
              title={article.title}
            />
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      {shouldShowArrows && showLeftArrow && (
        <button
          aria-label="Défiler vers la gauche"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
          onClick={() => scroll("left")}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      )}
      {shouldShowArrows && showRightArrow && (
        <button
          aria-label="Défiler vers la droite"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
          onClick={() => scroll("right")}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      )}
    </div>
  );
}
