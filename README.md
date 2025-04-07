# Barebones Next.js 15 Starter Kit

This is a starter kit providing basic building blocks for quickstart projects to try out other tools.

- **Next.js 15 / React 19 / Tailwind v4**
- **shadcn/ui:** Complete with:
   - All components and utils located in `app/_components/`
   - `<ThemeProvider />` and `<ThemeToggle />` components for light/dark mode
   - All radiuses and box-shadows set to 0.
- **Biome:** Complete with:
   - Built out `biome.json` and `.vscode/settings.json` configs
- **Bun:** 

### Installation

1.  Clone the repo:
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```
2.  Install dependencies using Bun:
    ```bash
    bun install
    ```

### Running the Development Server

Start the development server (with Turbopack):

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run the following scripts using Bun:

-   `bun dev`: Runs the app in development mode with Turbopack.
-   `bun build`: Builds the app for production.
-   `bun start`: Starts the production server.
-   `bun lint`: Lints the code in the `app` and `src` directories using Biome and applies fixes.
-   `bun format`: Formats the code in the `app` and `src` directories using Biome and applies fixes.
-   `bun check`: Runs Biome's combined linting, formatting, and safety checks, applying fixes.
-   `bun typecheck`: Runs the TypeScript compiler to check for type errors.

## Project Structure

```
.
├── app/                  # Main application folder (App Router)
│   ├── _components/      # Shared UI components (shadcn/ui)
│   │   └── ui/           # Generated shadcn/ui components
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── public/               # Static assets
├── .gitignore            # Git ignore rules
├── biome.json            # Biome configuration
├── bun.lockb             # Bun lockfile
├── components.json       # shadcn/ui configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Project metadata and dependencies
├── postcss.config.mjs    # PostCSS configuration (for Tailwind)
├── README.md             # This file
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Learn More

To learn more about the technologies used, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [React Documentation](https://react.dev/)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [shadcn/ui Documentation](https://ui.shadcn.com/docs)
-   [Biome Documentation](https://biomejs.dev/docs/)
-   [TypeScript Documentation](https://www.typescriptlang.org/docs/)
-   [Bun Documentation](https://bun.sh/docs)
