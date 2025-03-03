document.addEventListener('DOMContentLoaded', function () {
  const links = [...document.querySelectorAll('a')]
  const forms = [...document.querySelectorAll('form')]

  links.forEach((link) =>
    link.addEventListener('click', (e) => e.preventDefault())
  )

  forms.forEach((form) =>
    form.addEventListener('submit', (e) => e.preventDefault())
  )
})
