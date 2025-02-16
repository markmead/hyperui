export interface PageLink {
  href: string
  title: string
}

export interface PageMeta {
  title: string
  description: string
  alternates: {
    canonical: string
  }
}

export interface SiteRobots {
  rules: {
    userAgent: string
    allow: string
  }
  sitemap: string
}
