# Dashboard data dictionary

| Dashboard field | Source field | Type | Use |
|---|---|---|---|
| Vehicle ID | `vehicle_id` | Text | Vehicle-record count and row identifier |
| Manufacturer | `manufacturer` | Text | Manufacturer filter, sales ranking, market share |
| Model Year | `model_year` | Year | Filter and annual-sales comparison by model year |
| Manufacturing Country | `manufacturing_country` | Text | Country filter and sales-by-country view |
| Vehicle Category | `category` | Text | Filter, sales comparison, average-range comparison |
| Battery Type | `battery_type` | Text | Filter and technology mix |
| Battery Capacity (kWh) | `battery_capacity_kwh` | Number | Available in prepared data for future analysis |
| Driving Range (km) | `range_km` | Number | Average range KPI and category comparison |
| Annual Sales Units | `annual_sales_units` | Number | Sales totals, manufacturer share, country and model-year views |
| Customer Rating | `customer_rating` | Number | Average customer rating KPI |

The dashboard calculates sales as a sum, range and customer rating as averages, and battery technology mix as a share of vehicle records. These are record-level metrics from the supplied training dataset; they should not be presented as audited real-world market totals.
