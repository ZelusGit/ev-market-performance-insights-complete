# EV Market Performance & Insights

An interactive, browser-based dashboard for exploring a 200,000-row electric vehicle dataset. It compares annual sales, manufacturers, battery technologies, driving range, customer ratings, and manufacturing countries.

**Repository:** [ZelusGit/ev-market-performance-insights](https://github.com/ZelusGit/ev-market-performance-insights)
**Live demo:** Not published yet. The app is a static site and can be enabled with GitHub Pages; see [deployment instructions](docs/deployment.md).

## Open the dashboard

1. Clone or download this repository.
2. From the repository root, run `python3 -m http.server 8000`.
3. Open `http://localhost:8000` in a current browser. The dashboard decodes, decompresses, and loads `data/cleaned/ev_market_cleaned.csv.gz` automatically.

The dashboard uses only local HTML, CSS, and JavaScript. No build step or third-party chart library is required.

## What it shows

- KPI cards for vehicle records, total annual sales, average range, and average customer rating.
- Sales by category and model year.
- Top manufacturers by annual sales and each manufacturer's market share.
- Battery technology mix, average range by category, and sales by country.
- Category, manufacturer, battery, country, and model-year filters.

Metrics are calculated from the included cleaned CSV. Missing values are excluded from the relevant metric; no values are imputed. See the [data preparation log](docs/data-preparation.md) and [data dictionary](docs/data-dictionary.md).

## SkillWallet project sequence

1. [Data collection and extraction](docs/data-preparation.md) — preserve the source dataset in `data/raw/`.
2. [Data preparation](docs/data-preparation.md) — select dashboard fields and keep missing measurements blank.
3. [Data visualizations](docs/dashboard-design.md) — inspect the individual chart views.
4. Dashboard — use `index.html`, `styles.css`, and `app.js` for the interactive dashboard.
5. Story — follow the narrative sequence in [story.md](docs/story.md).
6. [Performance notes](docs/performance-testing.md) — document checks as they are performed.
7. [Web integration](docs/deployment.md) — enable GitHub Pages for a public demo.
8. [Demonstration and documentation](docs/skillwallet-epic-checklist.md) — complete the checklist and add the published demo URL.

## Project structure

```text
├── index.html
├── styles.css
├── app.js
├── data/
│   ├── raw/README.md
│   └── cleaned/ev_market_cleaned.csv.gz
├── docs/
│   ├── dashboard-design.md
│   ├── data-dictionary.md
│   ├── data-preparation.md
│   ├── deployment.md
│   ├── insights.md
│   ├── performance-testing.md
│   ├── skillwallet-epic-checklist.md
│   └── story.md
└── assets/
```

## Data source and limitations

The source is the `ev_market_train.csv` file already connected to the Tableau workbook. It contains 200,000 vehicle records and 37 fields. The repository includes a compressed dashboard extract with 10 relevant fields and all 200,000 rows; the original 37-field file is not redistributed. This repository does not claim a live Tableau or hosted demo URL; GitHub Pages must be enabled before one is available.

## License and attribution

The dataset was supplied with the SkillWallet EV Market Performance & Insights project. Keep its original attribution and usage terms when redistributing it.
