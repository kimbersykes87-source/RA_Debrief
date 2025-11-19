# Rubber Armstrong 2025 Camp Report

A beautiful, interactive webapp visualizing feedback from the 2025 Rubber Armstrong camp at Burning Man.

## Features

- 📊 Interactive data visualizations with animated charts
- 📱 Fully responsive, mobile-first design
- 🎨 Dark theme with pastel-colored charts
- 🔒 Fully anonymous - no personal data displayed
- 📈 Comprehensive feedback analysis across all camp categories

## Tech Stack

- React + Vite
- Recharts for data visualization
- Tailwind CSS for styling
- PapaParse for CSV data processing

## Local Development

```bash
npm install
npm run dev
```

## Deployment

This project is configured for Cloudflare Pages deployment.

### Build Settings

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18 or higher

### Cloudflare Pages Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository: `kimbersykes87-source/RA_Debrief`
4. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**

The site will automatically deploy on every push to the `main` branch.

## Project Structure

```
├── public/
│   ├── logo.svg          # Camp logo
│   └── responses.csv     # Feedback data
├── src/
│   ├── components/       # React components
│   ├── utils/            # Data parsing utilities
│   └── styles/           # Global styles
└── index.html
```

