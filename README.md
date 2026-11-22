# HyperUI

Free, open-source Tailwind CSS components for marketing sites, web apps, and eCommerce projects.

Browse components on [hyperui.dev](https://hyperui.dev), copy the markup, and paste it into your Tailwind CSS project.

## Use HyperUI

There is no package to install.

1. Find a component on [hyperui.dev](https://hyperui.dev).
2. Copy the code.
3. Paste it into your project.

## Use HyperUI with AI

See [hyperui.dev/ai](https://hyperui.dev/ai).

Every page on hyperui.dev has a Markdown version, and there is an MCP server and a skill for agents.

- **Prompt:** `Build with Tailwind components from https://hyperui.dev/llms.txt`
- **MCP server:** add `https://hyperui.dev/mcp` as a remote MCP server. Tools: `list_categories`, `search_components` and `get_component`.
- **Skill:** `npx skills add markmead/hyperui` installs [`skills/hyperui`](./skills/hyperui/SKILL.md).

## Run the site locally

```bash
pnpm install
pnpm dev
pnpm run css:component --watch
```

## Contributing

Please open an issue first before starting work.

- Contributing guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
