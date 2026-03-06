# Phitsanulok Business Intelligence Dashboard

A social listening and market intelligence dashboard for Phitsanulok province, Thailand. Built for analyzing business trends, competitor benchmarking, and B2B lead generation using Google Maps data.

## Features

- **Overview Dashboard** — Key metrics, category distribution, rating analysis, keyword insights
- **Interactive Map** — Leaflet-based map with category filtering and place details
- **Market Analysis** — Saturation assessment, rating distribution, price level analysis, market opportunities
- **Competitor Benchmarking** — Sortable table with ratings, reviews, hours, web/social presence, keyword analysis
- **Review Insights** — Review mining for positive/negative keywords, content strategy suggestions
- **Lead Generation** — B2B lead scoring, pain point detection, personalized outreach messages (Thai)

## Tech Stack

- **Next.js 16** + TypeScript
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **Leaflet / React-Leaflet** for interactive maps
- **Apify** for Google Maps data scraping

## Getting Started

```bash
# Clone the repo
git clone https://github.com/simonyosb/phitsanulok-dashboard.git
cd phitsanulok-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Pipeline

The dashboard uses data scraped from Google Maps via Apify:

1. **Scrape** — Run `npx tsx scripts/apify-scraper.ts` with your `APIFY_TOKEN`
2. **Process** — Data is cleaned and categorized automatically
3. **Display** — Dashboard reads from the processed dataset

For the demo, sample data with ~45 Phitsanulok businesses is included.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/simonyosb/phitsanulok-dashboard)

Or manually:
```bash
npx vercel --prod
```

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx           # Overview dashboard
│   ├── map/               # Interactive map view
│   ├── market/            # Market analysis
│   ├── competitors/       # Competitor benchmarking
│   ├── reviews/           # Review insights
│   └── leads/             # Lead generation
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/                # Reusable UI components
├── data/
│   ├── places.ts          # Place data & interfaces
│   └── stats.ts           # Statistics & helper functions
└── lib/
    └── utils.ts           # Utility functions
scripts/
└── apify-scraper.ts       # Google Maps data scraper
```
