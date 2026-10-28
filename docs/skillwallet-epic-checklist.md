# SkillWallet project checklist

This checklist reflects the deliverables currently present in the repository and the published GitHub Pages site. A checked item means its artifact or status is available; it does not imply an external SkillWallet form has been submitted.

## Project sequence

- [x] Data collection and extraction — inspected the supplied 200,000-row, 37-field source. The original file remains local; the repository contains the prepared 10-field extract only. See [data preparation](data-preparation.md).
- [x] Data preparation — selected dashboard fields, preserved missing values, and documented the duplicate vehicle ID.
- [x] Data visualizations — implemented sales, manufacturer, model-year, battery, driving-range, and country views.
- [x] Dashboard — published the interactive static site with filters and KPI cards.
- [x] Story — packaged a five-point Tableau story; see [story sequence](story.md) and the [workbook file](../EV%20Market%20Performance%20%26%20Insights%20-%20Updated.twbx).
- [x] Tableau Public dashboard and story — [open the published five-point interactive story](https://public.tableau.com/app/profile/dhruv.shrivastava/viz/EVMarketPerformanceInsights__17931690754480/Story1).
- [ ] Performance testing — browser timing and narrow-screen results have not yet been measured; record them in [performance notes](performance-testing.md).
- [x] Web integration — [GitHub Pages site](https://zelusgit.github.io/ev-market-performance-insights-complete/) is published from main at the repository root.
- [x] Project documentation — repository includes the [project report](../output/pdf/EV_Market_Performance_Project_Report.pdf), data notes, dashboard sources, and story documentation.
- [ ] Project demonstration — video recording and verified share link are pending.
- [ ] SkillWallet submission — enter the live website, repository, and video links in the portal after recording the video.
- [x] GitHub link — [ZelusGit/ev-market-performance-insights-complete](https://github.com/ZelusGit/ev-market-performance-insights-complete).
- [x] Prepared dataset — [download the compressed extract](../data/cleaned/ev_market_cleaned.csv.gz).
- [x] Compressed Tableau workbook — [download the workbook ZIP](../EV_Market_Performance_Insights_Tableau_Workbook.zip), extract it, and open the `.twbx` in Tableau Public/Desktop.
- [ ] Demo video — record the walkthrough, upload it to Google Drive with viewer access, then add its verified link as a separate demo row in the README and PDFs.

## Data caveats

The repository does not redistribute the original source CSV. The prepared extract keeps all 200,000 rows and ten selected fields. It has 2,028 blank annual-sales values, 3,977 blank customer ratings, and one repeated vehicle ID. Interpret sales and battery shares as metrics over supplied records, not audited market totals.
