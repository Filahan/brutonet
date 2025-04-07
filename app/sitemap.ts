import { MetadataRoute } from "next";

import blogData from "@/data/blog.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://brutonet.fr";

  // Main pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }
  ];

  // Blog pages
  const blogRoutes = blogData.articles.map((article) => ({
    url: `${baseUrl}/blog/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes];
}
