export type PostType = 'post' | 'article' | 'analyse'

export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  type: PostType
  date: string
  readTime: number
  featured?: boolean
}

export type ToolCategory = 'Productivité' | 'Création' | 'Automatisation' | 'Business'

export interface Tool {
  slug: string
  name: string
  logo: string
  category: ToolCategory
  tagline: string
  rating: number
  verdict: string
  content: string
  affiliateUrl: string
  affiliateLabel: string
  pricing: string
}

export interface NewsletterEdition {
  slug: string
  number: number
  title: string
  excerpt: string
  date: string
}
