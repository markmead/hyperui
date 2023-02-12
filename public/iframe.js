document.addEventListener('DOMContentLoaded', function () {
  const iframeLinks = [...document.querySelectorAll('a')]
  const iframeForms = [...document.querySelectorAll('form')]

  iframeLinks.forEach(function (iframeLink) {
    iframeLink.addEventListener('click', (e) => e.preventDefault())
  })

  iframeForms.forEach(function (iframeForm) {
    iframeForm.addEventListener('submit', (e) => e.preventDefault())
  })
})
