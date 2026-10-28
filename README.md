
# EV Market Performance & Insights

Interactive dashboard and Tableau story exploring sales, manufacturers, battery technologies, driving range, customer ratings, and manufacturing countries across a supplied 200,000-row EV dataset.

**Prepared by:** Dhruv Shrivastava · **Institute:** Medicaps University, Indore

## Project links

| Resource | Link |
|---|---|
| GitHub repository | [Open this repository](https://github.com/ZelusGit/ev-market-performance-insights-complete) |
| Live website | [Open the live dashboard](https://zelusgit.github.io/ev-market-performance-insights-complete/) |
| Website source | [Dashboard source](index.html) · [Styles](styles.css) · [Interactions](app.js) |
| Tableau Public dashboard and story | [Open the interactive five-point story](https://public.tableau.com/app/profile/dhruv.shrivastava/viz/EVMarketPerformanceInsights__17931690754480/Story1) |
| Compressed Tableau workbook | [Download workbook ZIP](EV_Market_Performance_Insights_Tableau_Workbook.zip) · [open the original TWBX](EV%20Market%20Performance%20%26%20Insights%20-%20Updated.twbx) |
| Project report | [Open the 7-page report](output/pdf/EV_Market_Performance_Project_Report.pdf) |
| Prepared data extract | [Download compressed CSV](data/cleaned/ev_market_cleaned.csv.gz) |
| Story sequence | [Read the five story points](docs/story.md) |
| Data preparation | [Read preparation notes](docs/data-preparation.md) |
| SkillWallet checklist | [Open requirements checklist](docs/skillwallet-epic-checklist.md) |
| Demo video | [https://www.loom.com/share/5a8d9cd829fe4909968b44f0b236b6b3](https://www.loom.com/share/5a8d9cd829fe4909968b44f0b236b6b3) |

The live website is deployed from main at the repository root. Viewers can use the live website link for the interactive web dashboard, the Tableau Public link for the interactive five-point Tableau story, and the prepared data extract link to download the data used by the website. Download the compressed workbook ZIP, extract it, then open the `.twbx` in Tableau Public/Desktop; the original `.twbx` is also available directly. Browser performance measurements are pending. The original 37-field CSV remains local; the repository includes only the prepared 10-field extract.

## Run the dashboard locally

1. Clone or download this repository.
2. In its root, run python3 -m http.server 8000.
3. Visit http://localhost:8000 in a current browser. The dashboard loads the compressed CSV automatically.

## Dashboard views

The page includes KPI cards and interactive filters for model year, vehicle category, manufacturer, battery type, and country. Charts compare sales by category and year, manufacturer sales/share, battery mix, range by category, and sales by country.

## Data notes

The source has 200,000 records and 37 fields; the repository contains a prepared 10-field extract. Missing annual sales and customer ratings remain blank and are excluded from calculations that require those measures. One vehicle ID repeats across two source rows. Values are exploratory, not audited market totals or forecasts. See [data preparation](docs/data-preparation.md) and the [data dictionary](docs/data-dictionary.md).
