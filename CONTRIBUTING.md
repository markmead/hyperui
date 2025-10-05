# Contributing to <HyperUI>

Thanks for wanting to contribute — we ❤️ contributions. This short, action-oriented guide helps new contributors get started quickly. For full, in-depth guidance see `docs/how-to-contribute.mdx` (if present).

## TL;DR
1. Fork the repo.  
2. Create a feature branch: `contrib/<short-desc>-<your-github-username>`.  
3. Make small, focused changes.  
4. Run tests & linters (if present).  
5. Open a PR and reference the issue (e.g. `Closes #615`).

## Where to start
- Look for labels: `good first issue`, `help wanted`, `documentation`.  
- If you plan a big change, open an issue first to discuss design.  
- For documentation fixes, edit files in `docs/` or suggest PRs that improve examples.

## How to report bugs
- Provide steps to reproduce, expected vs actual behavior, environment (OS, Node/Python version), and logs or screenshots if helpful.

## Code style & tests
- Follow the existing project style. Run the test command if available (e.g. `npm test`, `pytest`, or `make test`).  
- Run formatters/linters before commit if the repo has them (e.g. `npm run lint`, `prettier --check .`).

## Commit message format
Use short, clear Conventional Commit-style messages:
- `feat:` for new features  
- `fix:` for bug fixes  
- `docs:` for documentation changes  
- `chore:` for maintenance
Example: `chore: add CONTRIBUTING.md (closes #615)`

## Pull request checklist
Before requesting review:
- [ ] Branch is named `contrib/<short>-<your-username>`.  
- [ ] Includes tests or updated docs if applicable.  
- [ ] Linting/formatting passed.  
- [ ] PR description mentions related issue(s) (e.g. `Closes #615`).  
- [ ] One-sentence summary of the change at top of PR body.

## Review process
- Maintainers will review and may ask for small changes. Please respond to review comments quickly to speed merge.

## Code of Conduct & License
By contributing, you agree to follow this repo's `CODE_OF_CONDUCT.md` (if present) and the project license.
