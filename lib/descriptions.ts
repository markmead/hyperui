const alerts =
  'Alerts are used to notify the user of an important event on the wesbite such as a form error, or to give the user a choice to proceed or cancel an action.'

const announcements =
  'Announcements showcase something new of importance to the user. They can be used to highlight a new feature, a new product, or a new service.'

const banners =
  'Banners welcome your users to a new page, they are above the fold and should be used to get your users attention and direct them to a product or service.'

const descriptions = {
  alerts,
  announcements,
  banners,
}

export function getDescription(id: string): string {
  return descriptions[id]
}
