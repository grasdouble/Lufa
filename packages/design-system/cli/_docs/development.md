# Development

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Run in development mode (with TypeScript)
pnpm dev path/to/theme.css

# Print the template
pnpm dev -- --template

# Or run directly with tsx
pnpm exec tsx src/cli.ts --template

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm typecheck

# Lint
pnpm lint
```
