const alerts =
  'Alerts are used to notify the user of an important event on the wesbite such as a form error, or to give the user a choice to proceed or cancel an action.'

const descriptions = {
  alerts,
}

export function getDescription(id: string): string {
  return descriptions[id]
}
