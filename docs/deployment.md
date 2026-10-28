# GitHub Pages deployment

The static dashboard is published from the main branch at the repository root. The public URL is:

[https://zelusgit.github.io/ev-market-performance-insights-complete/](https://zelusgit.github.io/ev-market-performance-insights-complete/)

The project README links to this URL. Use it for reviewers and the SkillWallet portal; localhost:8000 is only for local development.

The site fetches data/cleaned/ev_market_cleaned.csv.gz and decompresses the gzip CSV in the browser. It must be opened through HTTP or HTTPS; opening index.html directly as a file URL will not load the data in modern browsers.

## Tableau Public access

The workbook is published on Tableau Public at [the interactive five-point story](https://public.tableau.com/app/profile/dhruv.shrivastava/viz/EVMarketPerformanceInsights__17931690754480/Story1). Reviewers can navigate the story points and interact with the Tableau views in a browser. The packaged workbook is also available separately for download. The prepared data used by the website is available as a separate downloadable link in the README and website resources: data/cleaned/ev_market_cleaned.csv.gz.

To republish after a change, push updated files to main and check the repository Actions tab or Settings → Pages for deployment status. Open the public URL after deployment and confirm the dashboard reports 200,000 records.
