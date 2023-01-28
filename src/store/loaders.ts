export function loadState() {
  try {
    const serializedState = localStorage.getItem('state')

    if (serializedState === null) {
      return
    }

    return JSON.parse(serializedState)
  } catch {}
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem('state', serializedState)
  } catch {}
}
