# Frame

Landing page for **Frame**, a local-first AI coding IDE that personalizes itself to how you write code. Nothing leaves your machine.

Built with React, Vite, GSAP (scroll-driven hero animation), and Sass.

## Features on this site

- Scroll-driven Cicada-style hero with tree and circle animations
- Product sections: about, how it works, features, privacy, download tiers
- Sunset cloud ending with vignette lighting
- Toolbar that switches to a dark theme over the black content sections

## Setup

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```
src/
  App.jsx                 # Toolbar + page shell
  App.css                 # Toolbar styles
  HomePage.jsx            # Loads the Cicada markup and GSAP init
  cicada/
    cicadaMarkup.html     # Hero + Frame content markup
    initCicadaAnimations.js
    style.sass
public/
  clouds.png              # Ending-section background
```

## Notes

- The hero animation is scroll-scrubbed. Sections below the hero use fade-up and ring motifs as you scroll.
- Nav links (`about`, `demo`, `product`, `download`) jump to matching section IDs with smooth scrolling.
