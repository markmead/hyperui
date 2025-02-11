export interface iPageLink {
  href: string
  title: string
}

export interface iPageMeta {
  title: string
  description: string
  alternates: {
    canonical: string
  }
}

export interface iPageRobots {
  rules: {
    userAgent: string
    allow: string
  }
  sitemap: string
}
