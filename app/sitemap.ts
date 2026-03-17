import { MetadataRoute } from "next"
import { posts } from "@/content/posts"
import { tools } from "@/content/tools"

const BASE = "https://standard-ia.pro"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE}/posts`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/outils`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/newsletter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ]

  const postPages = posts.map(p => ({
    url: `${BASE}/posts/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const toolPages = tools.map(t => ({
    url: `${BASE}/outils/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...postPages, ...toolPages]
}
