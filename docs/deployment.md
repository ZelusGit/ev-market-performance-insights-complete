# Publish with GitHub Pages

The project is a static site and requires no build step.

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then save.
4. Wait for the Pages deployment to complete. The public URL will be shown in the Pages settings and in the repository's deployments.
5. Open the URL and confirm the dashboard loads the prepared CSV. Then update the **Live demo** link in the root README and the SkillWallet project portal.

The dashboard fetches `data/cleaned/ev_market_cleaned.csv.gz.b64`, decodes and decompresses it in the browser, so it must be served over HTTP or HTTPS; opening `index.html` directly as a `file://` URL will not load the data in modern browsers.
