const COPY_RESET_DELAY_MS = 1500

type CopyButtonStateOptions = {
  buttonTextElement: HTMLElement
  liveRegionElement: HTMLElement
  buttonElement?: HTMLButtonElement
  existingTimerId: ReturnType<typeof setTimeout> | null
  /** Button label to restore after the "Copied" state. Defaults to "Copy". */
  resetText?: string
  onReset?: () => void
}

export function applyCopiedButtonState(
  copyButtonStateOptions: CopyButtonStateOptions,
): ReturnType<typeof setTimeout> {
  const {
    buttonTextElement,
    liveRegionElement,
    buttonElement,
    existingTimerId,
    resetText = 'Copy',
    onReset,
  } = copyButtonStateOptions

  buttonTextElement.textContent = 'Copied'
  liveRegionElement.textContent = 'Copied to clipboard.'
  buttonElement?.setAttribute('aria-pressed', 'true')

  if (existingTimerId) {
    clearTimeout(existingTimerId)
  }

  return setTimeout(() => {
    buttonTextElement.textContent = resetText
    liveRegionElement.textContent = ''
    buttonElement?.setAttribute('aria-pressed', 'false')
    onReset?.()
  }, COPY_RESET_DELAY_MS)
}

export async function copyTextToClipboard(
  textToCopy: string,
  copyButtonStateOptions: CopyButtonStateOptions,
): Promise<ReturnType<typeof setTimeout> | null> {
  try {
    await navigator.clipboard.writeText(textToCopy)
    return applyCopiedButtonState(copyButtonStateOptions)
  } catch {
    return copyButtonStateOptions.existingTimerId
  }
}
