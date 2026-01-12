# 11ty-starter-kit

[**Live Demo**](https://thomiomi.github.io/11ty-starter-kit/)

Welcome to the **11ty-starter-kit**! 🚀

This is a modern, battery-included starter template designed to get your blog, portfolio, or documentation site up and running quickly. It combines the speed of **Eleventy** with the utility of **Tailwind CSS v4** and the interactivity of **Alpine.js**.

## ✨ Features

- **Eleventy v3**: The latest version of the simpler static site generator.
- **Tailwind CSS v4**: Next-generation utility-first CSS framework (configured via PostCSS).
- **Alpine.js**: Lightweight JavaScript framework for interactive behavior.
- **Image Optimization**: Automatic image processing using `@11ty/eleventy-img`.
- **Open Graph Images**: Dynamic OG image generation using `satori`.
- **Production Ready**: Minification, cache-busting (hashing), and SEO best practices.
- **Developer Experience**: Pre-configured with ESLint, Prettier, and Husky for code quality.

## 🛠 Prerequisites

- **Node.js**: Version **v22+** (Required).
  - _Note: This project requires a recent Node.js version._

## 🚀 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd 11ty-starter-kit
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:8080` to see your site in action!

## 💻 Development Workflow

To ensure code quality and consistency, follow this workflow when developing:

1.  **Start the Dev Server**: Run `npm run dev` to start Eleventy with hot-reload.
2.  **Linting**: Before committing, run `npm run lint` to check for code issues.
3.  **Formatting**: Run `npm run format` to automatically format your code with Prettier.
4.  **Production Build**: Run `npm run build` to simulate a production build locally.

_Note: Husky is configured to automatically run lint and format on pre-commit._

## 📜 Available Scripts

| Script           | Description                                                |
| :--------------- | :--------------------------------------------------------- |
| `npm run dev`    | Starts the local development server with hot reload.       |
| `npm run build`  | Builds the project for production (minification, hashing). |
| `npm run lint`   | Runs ESLint to catch code errors.                          |
| `npm run format` | Runs Prettier to format your code.                         |

## 📂 Project Structure

A quick look at the `src` directory:

- `src/layouts/`: Nunjucks layout templates.
- `src/components/`: Reusable UI components.
- `src/pages/`: Content pages (Markdown/Nunjucks).
- `src/utils/`: Helper scripts (OG generation, shortcodes).
- `src/assets/`: Static assets (fonts, images).
- `src/css/`: Global styles (Tailwind setup).
- `src/js/`: Application JavaScript.

## 🌍 Deployment

This starter kit comes with configuration files for the most popular hosting platforms.

### GitHub Pages (Recommended)

This project is configured for **GitHub Pages** using GitHub Actions.

1.  Go to your repository **Settings** on GitHub.
2.  Navigate to **Pages** (sidebar).
3.  Under **Build and deployment**, select **GitHub Actions** as the source.
4.  The workflow file located at `.github/workflows/deploy.yml` handles the rest.
    - **Trigger**: Pushes to the `main` branch.
    - **Process**: Installs dependencies, builds the site (`npm run build`), and deploys to GitHub Pages.

### Netlify

A `netlify.toml` file is included.

1.  Log in to Netlify and select "Add new site".
2.  Import this repository.
3.  Netlify will automatically detect the settings from `netlify.toml`.
4.  Click **Deploy**.

### Vercel

A `vercel.json` file is included.

1.  Log in to Vercel and add a "New Project".
2.  Import this repository.
3.  Vercel will detect the `vercel.json` configuration.
4.  Click **Deploy**.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
