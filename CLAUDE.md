# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **VuePress 2 static documentation site** - a personal knowledge base for DevOps/Backend engineering notes.

## Commands

```bash
# Install dependencies
pnpm install

# Start dev server (hot reload)
pnpm docs:dev

# Build static site
pnpm docs:build

# Clean dev cache
pnpm docs:clean-dev
```

## Architecture

- **Framework**: VuePress 2.0 with vuepress-theme-hope
- **Content**: Markdown files in `src/` directory
- **Structure**:
  - `src/shell_script/` - Shell scripting notes
  - `src/software/` - Software configs (Linux, MySQL, Nginx, Docker, Git)
  - `src/work/` - Work/operations records (K8s, troubleshooting)
  - `.vuepress/` - VuePress config (theme, sidebar, styles)

No test suite - this is a static documentation site.

## Dependencies

- pnpm 9.x (configured in packageManager)
- Node.js for VuePress build
