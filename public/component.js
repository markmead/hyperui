document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a, input[type="file"]').forEach((iframeLink) => {
    iframeLink.addEventListener('click', (e) => e.preventDefault())
    iframeLink.addEventListener('keydown', (e) => e.preventDefault())
  })

  document.querySelectorAll('form').forEach((iframeForm) => {
    iframeForm.addEventListener('submit', (e) => e.preventDefault())
  })
})
