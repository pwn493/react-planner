# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal planner app built in React, deployed to GitHub Pages at `https://pwn493.github.io/react-planner`.

## Commands

```bash
npm start          # dev server at localhost:3000
npm test           # run tests in watch mode
npm test -- --watchAll=false  # run tests once (CI mode)
npm run build      # production build to /build
npm run deploy     # build + push to gh-pages branch
```

## Architecture

Bootstrapped with Create React App (React 19, no TypeScript). Entry point is `src/index.js` → `src/App.js`. No routing, state management, or additional libraries have been added yet — the app is at the initial boilerplate stage.

Deployed via `gh-pages` package: `npm run deploy` runs the `predeploy` build step automatically, then pushes `/build` to the `gh-pages` branch.
