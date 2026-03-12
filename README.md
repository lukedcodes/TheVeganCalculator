# The Vegan Calculator - Documentation

This document outlines the architecture, design practices, and local development setup for The Vegan Calculator.

## Project Structure

The project is a lightweight static site designed for performance and ease of maintenance.

- `index.html`: The main entry point.
- `components/`: Pure HTML partials (Header, Footer, Menu, etc.) that are dynamically loaded.
- `js/`:
    - `components.js`: A lightweight runtime loader that fetches and injects HTML partials into `data-component` placeholders.
    - `calculator.js`: Core logic for environmental impact calculations.
    - `main.js`: UI interactions and event handling.
- `css/`: Modern, responsive styling using CSS variables and a custom design system.

## Design Practices

- **Component-Based Architecture**: Even as a static site, we use a component-based approach for reusability without a heavy build step.
- **Premium Aesthetics**: High-contrast, vibrant color palettes (Deep Forest Green, Vibrant Red) and modern typography (Poppins, Material Symbols).
- **Responsive Layout**: Fluid layouts that adapt seamlessly from mobile to desktop.
- **SEO Optimized**: Semantic HTML5 and meta tags for visibility and sharing.

## Local Development Setup

To serve the site locally and ensure components are loaded correctly, we use a simple static file server.

### Recommended Server: `http-server`

Since the site uses runtime `fetch()` requests for components, some more advanced servers (like `browser-sync` with default settings) may attempt to perform "clean URL" redirects that can break these requests.

**Command to start:**
```bash
npx http-server -p 3000 -c-1 --cors
```

- `-p 3000`: Runs on port 3000.
- `-c-1`: Disables caching for development.
- `--cors`: Enables Cross-Origin Resource Sharing.

### Alternative: `python`
```bash
python -m http.server 3000
```
