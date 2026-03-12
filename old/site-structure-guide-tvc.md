# Site Structure and Build Process

This document outlines how the site is structured and built, which serves as a scaffold for creating similar static websites.

## Core Technologies
- **Node.js & NPM:** Used for managing build dependencies (`package.json`).
- **Gulp (`gulpfile.js`):** The task runner responsible for the build process (compiling HTML, concatenating/minifying CSS and JS, and running a local development server with live reload).
- **Browser-Sync:** Provides a local development server (`http://localhost:3000`) and automatically refreshes the browser when files change.

## Folder Structure

```text
/ (Project Root)
├── src/                # Source files for development
│   ├── index.html      # Main HTML source file
│   ├── css/            # Individual CSS source files
│   └── partials/       # Reusable HTML snippets (e.g., footer.html, scripts.html)
│
├── js/                 # JavaScript source files and vendors (jQuery, Foundation, etc.)
│   └── app.min.js      # (Compiled) The final concatenated and minified JS file
│
├── css/                # (Compiled) The final output directory for CSS
│   └── app.css         # The concatenated and minified CSS file
│
├── img/                # Static image assets
├── node_modules/       # Installed NPM dependencies (ignored in git)
├── package.json        # NPM dependencies and scripts
└── gulpfile.js         # Gulp configuration and build tasks
```

## How the Build Process Works

The build process is managed by `gulpfile.js`. Here are the primary tasks involved:

### 1. HTML Compilation (`gulp fileinclude`)
- **Source:** HTML files in `src/` (e.g., `src/index.html`) but ignores `src/partials/`.
- **Process:** It looks for the special syntax `@@include('./partials/filename.html')` and replaces it with the actual content of that file. It then minifies the resulting HTML file (removing whitespaces and comments).
- **Output:** The compiled HTML files are placed directly in the **Root Directory** (`./`).

### 2. CSS Pipeline (`gulp css`)
- **Source:** Specific CSS files listed in `gulpfile.js` from `src/css/` (e.g., `normalize.css`, `foundation.css`, `style.css`, etc.).
- **Process:** Concatenates all listed CSS files into a single file and minifies it using `cleanCSS` (with IE8 compatibility).
- **Output:** `css/app.css`

### 3. JavaScript Pipeline (`gulp javascript`)
- **Source:** Specific JS files listed in `gulpfile.js` from the `js/` directory (e.g., `jquery.js`, `foundation.js`, `vegan-calculator.js`, etc.).
- **Process:** Concatenates all these files into a single file and minifies it using `terser`.
- **Output:** `js/app.min.js`

## How to Develop and Build

To start developing or building a new site using this scaffold, you only need a couple of commands:

1. **Install Dependencies:**
   Make sure you have Node.js installed, then run the following in your terminal to install the necessary packages listed in `package.json`:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   This will run the `default` Gulp task (which builds the site first) and then starts `browser-sync`. It will continuously watch for changes in your HTML, CSS, and JS files and automatically reload your browser.
   ```bash
   npm start
   # or run 'gulp' directly
   ```

3. **Build Without Serving:**
   If you just want to generate the final files in the root, `css/`, and `js/` folders without starting a server:
   ```bash
   gulp build
   ```

## Creating a Similar Site

If you want to create a similar static site:
1. Copy `package.json` and `gulpfile.js` to your new project folder.
2. Replicate the directory structure (`src/css`, `src/partials`, `js/`).
3. Run `npm install` to get the dependencies.
4. Modify the file arrays inside `gulpfile.js` (`gulp css` and `gulp javascript` tasks) to reflect the stylesheets and scripts you end up using.
5. Use `@@include('./partials/your-partial.html')` in your `src/*.html` files to keep your codebase modular.
6. Run `gulp` to start developing!
