#!/usr/bin/env node

import {
  TARGET_COVERAGE,
  accept,
  coverageReport,
  findDrift,
  findMatches,
  makeLink,
  percent,
  readLinks,
  suggest,
  tidy,
  writeLinks,
} from './lib/template-links.js'

const [command, ...args] = process.argv.slice(2)

const usage = `Templates are built from components, and new templates feed components.
Every template page lists all of the components it is built from.

  pnpm templates:links                          check the links, and how much each template is covered
  pnpm templates:links --status                 how much of each template its components cover
  pnpm templates:links --suggest <template>     components found inside a template, not yet linked
  pnpm templates:links --add <template> <component> [--from-template]
                                                link a template to a component it is built from
                                                (--from-template: the component was made from it)
  pnpm templates:links --add-matches <template> link every component found inside a template
  pnpm templates:links --accept [template]      record the current state, once both sides agree

References are a component's uuid, or its place as category/slug/variant, such as
templates/saas-landing-page/1 or marketing/pricing/1.`

const report = () =>
  coverageReport()
    .map(
      (page) =>
        `${percent(page.coverage).padStart(4)}  ${page.name}  (${page.components.length} components, floor ${percent(page.floor)})`,
    )
    .join('\n')

if (command === '--accept') {
  writeLinks(accept(readLinks(), args[0]))

  console.log(args[0] ? `Accepted ${args[0]}.` : 'Accepted every template.')
} else if (command === '--add') {
  const [template, component] = args

  if (!template || !component) {
    console.error(usage)
    process.exit(1)
  }

  try {
    const newLink = makeLink({
      template,
      component,
      origin: args.includes('--from-template') ? 'template' : 'existing',
    })

    const data = readLinks()

    data.links = data.links.filter(
      (link) => !(link.template === newLink.template && link.component === newLink.component),
    )

    data.links.push(newLink)

    writeLinks(tidy(data))

    console.log(`Linked ${newLink.templateName} to ${newLink.componentName}.`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
} else if (command === '--suggest') {
  if (!args[0]) {
    console.error(usage)
    process.exit(1)
  }

  const results = suggest(args[0])

  console.log(
    results.length === 0
      ? 'No more components found inside this template.'
      : results.map(({ reference, score }) => `${score}  ${reference}`).join('\n'),
  )
} else if (command === '--add-matches') {
  if (!args[0]) {
    console.error(usage)
    process.exit(1)
  }

  let data = readLinks()

  for (const match of findMatches(args[0], data)) {
    data = tidy({
      ...data,
      links: [...data.links, makeLink({ template: args[0], component: match.reference })],
    })

    console.log(
      `Linked ${args[0]} to ${match.reference}${match.twins.length > 0 ? ` (same structure: ${match.twins.join(', ')})` : ''}.`,
    )
  }

  writeLinks(data)
} else if (command === '--status') {
  console.log(`${report()}\n\nTarget: ${percent(TARGET_COVERAGE)} of every template.`)
} else if (command === undefined) {
  const problems = findDrift()

  if (problems.length > 0) {
    console.error(problems.map((problem) => `- ${problem}`).join('\n\n'))
    process.exit(1)
  }

  const below = coverageReport().filter((page) => page.coverage < TARGET_COVERAGE)

  console.log(
    `Every link is in step.${below.length > 0 ? `\n${below.length} of ${coverageReport().length} templates are below the ${percent(TARGET_COVERAGE)} target. See: pnpm templates:links --status` : ''}`,
  )
} else {
  console.error(usage)
  process.exit(1)
}
