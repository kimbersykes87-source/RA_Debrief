# Rubber Armstrong 2025 Camp Report

A beautiful, interactive webapp visualizing feedback from the 2025 Rubber Armstrong camp at Burning Man.

**Live Site**: https://ra-debrief-2025.pages.dev

## Features

- 📊 Interactive data visualizations with animated charts
- 📱 Fully responsive, mobile-first design
- 🎨 Dark theme with pastel-colored charts
- 🔒 Fully anonymous - no personal data displayed (Timestamp, Name, Email excluded)
- 📈 Comprehensive feedback analysis across all camp categories
- 📊 Real-time analytics tracking via Cloudflare Web Analytics
- 🔗 Optimized for WhatsApp sharing with custom Open Graph preview

## Tech Stack

- **React + Vite** - Modern frontend framework
- **Recharts** - Rich, animated data visualizations
- **Tailwind CSS** - Utility-first styling
- **PapaParse** - CSV data processing
- **Space Grotesk** - Headline font
- **Inter** - Body text font

## Project Structure

```
├── public/
│   ├── logo.svg          # Camp logo (white SVG)
│   ├── og-image.png      # Open Graph image for social sharing (1200x630px)
│   └── responses.csv     # Feedback data (anonymized)
├── src/
│   ├── components/       # React visualization components
│   │   ├── SatisfactionDashboard.jsx
│   │   ├── CategoryHeatmap.jsx
│   │   ├── RadarChart.jsx
│   │   ├── FeeAnalysis.jsx
│   │   ├── TextAnalysis.jsx
│   │   ├── Shoutouts.jsx
│   │   ├── Ideas2026.jsx
│   │   └── VolunteerInterests.jsx
│   ├── utils/
│   │   └── dataParser.js # CSV parsing and data transformation
│   └── styles/
│       └── index.css     # Global styles and animations
├── index.html            # Main HTML with meta tags
└── package.json
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server (opens browser automatically)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs on `http://localhost:3000` and auto-opens in your browser.

## Data Structure

The app processes CSV data with the following columns (anonymized):
- **Rating Categories**: Camp Vibes, Family Dinners, Mezcal Bar, Water & Showers, Shade & Tents, Bikes, Art Car, Radiance Hour, RA Express, MOOP & Recycling
- **Numeric Ratings**: Recommend RA? (1-10 scale)
- **Text Feedback**: What worked well, Improvements, Start/Stop/Continue, Shout-outs, 2026 Ideas
- **Fees**: Camp Fees, Tent Fees, AC Fees, Bike Fees
- **Volunteer Interests**: Various camp roles and responsibilities

**Privacy**: Columns A (Timestamp), B (Name), and C (Email) are automatically excluded during processing.

## Visualizations

### 1. Overall Satisfaction Dashboard
- Recommend RA Score gauge chart (animated)
- Returning 2026 pie chart
- Total responses counter

### 2. Category Ratings
- Stacked bar chart showing rating distribution
- Average rating bar chart with color-coded performance

### 3. Category Comparison
- Radar/spider chart comparing all 10 categories
- Summary statistics (highest, lowest, overall average)

### 4. Fee Analysis
- Average fees by type bar chart
- Fee range chart (min/max)
- Summary cards for each fee type

### 5. Qualitative Feedback
- "What Worked Well" section
- "Improvements for 2026" categorized by topic
- "Start/Stop/Continue" three-column layout

### 6. Shout-outs & Gratitude
- All appreciation messages
- Frequently mentioned names (auto-extracted)

### 7. 2026 Ideas
- Ideas categorized by theme (Art, Food, Infrastructure, Community, etc.)

### 8. Volunteer Interests
- Horizontal bar chart of volunteer roles
- Top roles grid display

## Design System

### Colors
- **Background**: `#0a0a0a` (dark)
- **Surface**: `#1a1a1a` (darker gray)
- **Text**: `#ffffff` (white)
- **Charts**: Pastel colors (pink, green, blue, yellow, orange, purple, coral, mint)

### Typography
- **Headlines**: Space Grotesk (600-700 weight)
- **Body**: Inter (300-700 weight)
- **Responsive**: Uses `clamp()` for fluid typography

### Animations
- Fade-in animations on scroll
- Chart animations on load (staggered)
- Smooth transitions for logo header

## Deployment

### Cloudflare Pages

**Repository**: https://github.com/kimbersykes87-source/RA_Debrief

**Build Settings**:
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18 or higher

**Auto-deployment**: Every push to `main` branch triggers automatic deployment.

### Custom Domain (Optional)

1. Go to Cloudflare Pages project settings
2. Navigate to **Custom domains**
3. Add your domain
4. Update `og:url` in `index.html` with your custom domain

## Analytics

**Cloudflare Web Analytics** is configured and active.

**Token**: `32694517ca5f4e958297dc23be2ffcc5`

**View Analytics**:
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Analytics & Logs** → **Web Analytics**
3. Select your site: `ra-debrief-2025.pages.dev`

**Metrics Available**:
- Page views
- Unique visitors
- Traffic sources (WhatsApp, direct, referrers)
- Device types (mobile/desktop)
- Countries
- Real-time visitors

## Social Sharing (WhatsApp/bit.ly)

The site is optimized for link previews with:

- **Open Graph Tags**: Title, description, image, URL
- **Twitter Card**: Large image card format
- **Custom OG Image**: `public/og-image.png` (1200x630px)

**When shared**, the link preview shows:
- **Title**: "Rubber Armstrong 2025 Camp Report"
- **Description**: "Interactive visual insights from the 2025 Rubber Armstrong camp feedback..."
- **Image**: Custom thumbnail image
- **URL**: Your Cloudflare Pages domain

## Special Features

### Responsive Logo Header
- Logo starts centered at full size
- On scroll, moves to top-left at 25% size in a fixed header bar
- Smooth CSS transitions

### Mobile Optimization
- Touch-friendly interactive elements
- Responsive charts that resize/stack on mobile
- Collapsible sections for long content
- Mobile-first typography with `clamp()`

## Updating Data

To update the feedback data:

1. Export new CSV from Google Sheets
2. Replace `public/responses.csv` with new file
3. Commit and push to GitHub
4. Cloudflare Pages will auto-deploy

**Note**: The data parser automatically excludes Timestamp, Name, and Email columns for anonymity.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design tested on mobile devices

## License

Private project for Rubber Armstrong camp use.
