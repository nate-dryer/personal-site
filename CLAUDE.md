# Personal Site Development Guide

# REACT based personal website development project.
# This is a 1 page personal website for Nathan Dryer 
# Use best practices and emerging design trends of 2025

## Build Commands
- Development server: `yarn dev` / `npm run dev`
- Production build: `yarn build` / `npm run build` 
- Preview build: `yarn preview` / `npm run preview`
- Run tests: `yarn test` / `npm run test`
- Run single test: `yarn test -- -t "test name pattern"`

## Code Style Guidelines
- React 18 functional components with hooks
- ES modules (import/export syntax)
- JSX for React components
- Path alias: import from "@/" for src directory
- Use explicit return types for functions
- Prefer const over let, avoid var
- Use tailwind for styling (utility-first approach)
- Follow ESLint rules (react-hooks/rules-of-hooks, exhaustive-deps)
- Component naming: PascalCase (FooBar.jsx)
- Variable/function naming: camelCase

## Error Handling
- Use try/catch for async operations
- Prefer explicit error boundaries for component errors