
# Data collection and preparation

## Source

The open Tableau workbook is connected to `ev_market_train.csv` at `/Users/dhruv/Downloads/archive/ev_market_train.csv`. The source contains 200,000 records and 37 fields. The original source stays local; the repository contains only the prepared dashboard extract.

## Preparation performed

1. Inspected the original source data without altering it.
2. Selected the ten fields used by the dashboard: vehicle ID, manufacturer, model year, manufacturing country, category, battery type, battery capacity, range, annual sales, and customer rating.
3. Renamed the selected column headers for readability and trimmed whitespace around values.
4. Kept all 200,000 rows. Blank values remain blank; they are not guessed or imputed. The dashboard omits a blank value from the metric that depends on it.
5. Saved the prepared dashboard dataset as `data/cleaned/ev_market_cleaned.csv.gz`. The static dashboard fetches and decompresses the gzip file in the browser.

## Missing values in selected fields

The source has 2,028 blank `annual_sales_units` values and 3,977 blank `customer_rating` values. Other selected fields had no blanks in the source scan. Sales totals exclude rows with no sales value; average ratings exclude rows with no rating. Vehicle-record counts still include every row.

The source contains 199,999 distinct vehicle IDs across 200,000 rows, so one ID appears more than once. Both rows are retained; the dashboard counts source rows and does not claim the row count is a distinct-vehicle count.

## Checks to complete

- [x] Confirmed field names and row count.
- [x] Checked missing values for selected fields.
- [x] Record duplicate vehicle ID count (one repeated ID; both rows retained).
- [ ] Review outliers and confirm the source definitions for each metric.
- [ ] Record any additional transformations if the source is updated.
