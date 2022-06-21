export function urlSlug(slug: string, replace: string) {
  return slug.replace(`${replace}-`, '')
}
