# Dashboard design

The dashboard is an executive overview for the three SkillWallet project personas: market strategy, automotive business intelligence, and sustainable mobility research.

## Views

| View | Visual | Question |
|---|---|---|
| Vehicle records, annual sales, average range, customer rating | KPI cards | What does the selected market look like? |
| Sales by vehicle category | Ranked horizontal bars | Which categories account for the most recorded sales? |
| Manufacturer sales and market share | Ranked horizontal bars | Which manufacturers lead in recorded sales? |
| Sales by model year | Line chart | How do records compare across model years? |
| Battery technology mix | Donut chart | Which battery technologies are represented most often? |
| Average range by category | Ranked horizontal bars | How does average range vary across categories? |
| Sales by country | Ranked horizontal bars | Where are the manufacturers' recorded sales concentrated? |

Five filters update the KPI cards and all charts: model year, category, manufacturer, battery type, and country. The five-step story navigator follows overview, manufacturer sales, market share, battery technology, and range by category.

## Interpretation notes

- “Sales by model year” uses the source's `model_year` field; it is not a calendar-year time series.
- Manufacturer market share is a manufacturer's sales divided by the total nonblank sales in the current filtered selection.
- Battery mix is calculated from record counts, not sales volume.
- No year-over-year growth claims are made because the supplied fields do not identify sales reporting year.
