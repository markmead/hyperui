#!/usr/bin/env node

import {
  accept,
  findDrift,
  makeLink,
  readLinks,
  toUuid,
  suggest,
  writeLinks,
} from './lib/template-links.js'

const [command, ...args] = process.argv.slice(2)

const usage = `Templates are built from components, and new templates feed components.

  pnpm templates:links                          check that every link is in step
  pnpm templates:links --accept [template]      record the current state, once both sides agree
  pnpm templates:links --add <template> <component> [--feeds]
                                                link a template to a component it uses
                                                (or, with --feeds, one made from it)
  pnpm templates:links --suggest <template>     list components the template contains

References are a component's uuid, or its place as category/slug/variant, such as
templates/saas-landing-page/1 or marketing/pricing/1.`

if (command === '--accept') {
  writeLinks(accept(readLinks(), args[0] && toUuid(args[0])))

  console.log(args[0] ? `Accepted the links for ${args[0]}.` : 'Accepted all links.')
} else if (command === '--add') {
  const [template, component] = args

  if (!template || !component) {
    console.error(usage)
    process.exit(1)
  }

  const newLink = makeLink({
    template,
    component,
    direction: args.includes('--feeds') ? 'feeds' : 'uses',
  })

  const links = readLinks().filter(
    (link) => !(link.template === newLink.template && link.component === newLink.component),
  )

  links.push(newLink)

  links.sort(
    (a, b) =>
      a.templateName.localeCompare(b.templateName) ||
      a.componentName.localeCompare(b.componentName),
  )

  writeLinks(links)

  console.log(`Linked ${template} and ${component}.`)
} else if (command === '--suggest') {
  if (!args[0]) {
    console.error(usage)
    process.exit(1)
  }

  const results = suggest(args[0])

  console.log(
    results.length === 0
      ? 'No components found inside this template.'
      : results.map(({ reference, score }) => `${score}  ${reference}`).join('\n'),
  )
} else if (command === undefined) {
  const problems = findDrift()

  if (problems.length > 0) {
    console.error(problems.map((problem) => `- ${problem}`).join('\n\n'))
    process.exit(1)
  }

  console.log(`All ${readLinks().length} template links are in step.`)
} else {
  console.error(usage)
  process.exit(1)
}
