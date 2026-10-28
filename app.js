const DATA_URL = "data/cleaned/ev_market_cleaned.csv.gz.b64";
const COLORS = ["#41b88a", "#6589ed", "#8b73d6", "#e1a447", "#e27868", "#46a9ba", "#7893a0", "#b7ca5b"];
const fields = {
  id: "Vehicle ID", manufacturer: "Manufacturer", year: "Model Year",
  country: "Manufacturing Country", category: "Vehicle Category", battery: "Battery Type",
  capacity: "Battery Capacity (kWh)", range: "Driving Range (km)",
  sales: "Annual Sales Units", rating: "Customer Rating"
};
const storyPoints = [
  { title: "EV Market Overview", caption: "Start with the market snapshot, then compare sales, technology adoption, and driving range.", target: "overview" },
  { title: "Manufacturer Sales Performance", caption: "Compare annual sales across manufacturers and spot the leading brands.", target: "manufacturer-chart" },
  { title: "Market Share Across Manufacturers", caption: "Compare each leading manufacturer’s share of annual sales in the current selection.", target: "manufacturer-chart" },
  { title: "Battery Technology Preferences", caption: "See how LFP, NCA, NMC, Sodium-Ion, and Solid-State vehicles are represented.", target: "battery-chart" },
  { title: "Driving Range by Vehicle Category", caption: "Compare average driving range across vehicle categories in kilometres.", target: "range-chart" }
];
let rows = [];
let activeStory = 0;
const byId = (id) => document.getElementById(id);
const number = (value) => {
  if (value === "" || value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};
const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const fmt1 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const moneyless = (n) => n == null ? "—" : fmt.format(n);
const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
const safeText = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function parseCSV(text) {
  const records = [];
  let record = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { record.push(field); field = ""; }
    else if (ch === "\n") { record.push(field.replace(/\r$/, "")); records.push(record); record = []; field = ""; }
    else field += ch;
  }
  if (field.length || record.length) { record.push(field.replace(/\r$/, "")); records.push(record); }
  const headers = (records.shift() || []).map((s) => s.replace(/^\uFEFF/, "").trim());
  return records.filter((r) => r.length > 1 || r[0]).map((record) => {
    const item = {};
    headers.forEach((header, i) => { item[header] = (record[i] || "").trim(); });
    return item;
  });
}

function populateFilter(id, key) {
  const select = byId(id);
  const values = [...new Set(rows.map((row) => row[key]).filter(Boolean))]
    .sort((a, b) => key === "year" ? Number(a) - Number(b) : a.localeCompare(b));
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  select.addEventListener("change", render);
}

function filteredRows() {
  const selected = {
    year: byId("filter-year").value,
    category: byId("filter-category").value,
    manufacturer: byId("filter-manufacturer").value,
    battery: byId("filter-battery").value,
    country: byId("filter-country").value
  };
  return rows.filter((row) => Object.entries(selected).every(([key, value]) => !value || row[key] === value));
}

function aggregate(data, groupKey, valueKey, mode = "sum") {
  const groups = new Map();
  data.forEach((row) => {
    const label = row[groupKey] || "Not reported";
    const value = row[valueKey];
    if (value == null) return;
    const values = groups.get(label) || [];
    values.push(value);
    groups.set(label, values);
  });
  return [...groups].map(([label, values]) => ({
    label,
    value: mode === "avg" ? avg(values) : mode === "count" ? values.length : values.reduce((a, b) => a + b, 0)
  }));
}

function drawBars(elementId, entries, { color = "green", limit = 15, format = moneyless, sort = true } = {}) {
  const root = byId(elementId);
  const values = sort ? [...entries].sort((a, b) => b.value - a.value) : [...entries];
  const shown = values.slice(0, limit);
  if (!shown.length) { root.innerHTML = '<div class="chart-empty">No data for this filter selection</div>'; return; }
  const max = Math.max(...shown.map((d) => d.value), 1);
  root.innerHTML = shown.map((d) => `<div class="bar-row" title="${safeText(d.label)}: ${safeText(format(d.value))}">
    <div class="bar-label">${safeText(d.label)}</div>
    <div class="bar-track"><div class="bar-fill ${color}" style="width:${Math.max(1.5, d.value / max * 100)}%"></div></div>
    <div class="bar-value">${safeText(format(d.value))}</div>
  </div>`).join("");
}

function drawTrend(data) {
  const root = byId("trend-chart");
  const points = aggregate(data, "year", "sales").filter((d) => d.label !== "Not reported").sort((a, b) => Number(a.label) - Number(b.label));
  if (!points.length) { root.innerHTML = '<div class="chart-empty">No sales by model year for this selection</div>'; return; }
  const w = 600, h = 190, left = 37, right = 10, top = 12, bottom = 28;
  const max = Math.max(...points.map((d) => d.value), 1);
  const x = (i) => left + (points.length === 1 ? (w - left - right) / 2 : i * (w - left - right) / (points.length - 1));
  const y = (v) => h - bottom - (v / max) * (h - top - bottom);
  const path = points.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${path} L${x(points.length - 1)},${h - bottom} L${x(0)},${h - bottom} Z`;
  const grid = [0, .5, 1].map((t) => { const yy = top + t * (h - top - bottom); return `<line x1="${left}" x2="${w - right}" y1="${yy}" y2="${yy}" stroke="#edf1f2"/><text x="${left - 7}" y="${yy + 3}" text-anchor="end" fill="#9aa5aa" font-size="9">${safeText(fmt.compact(Math.round(max * (1 - t))))}</text>`; }).join("");
  const labels = points.map((d, i) => `<text x="${x(i)}" y="${h - 7}" text-anchor="middle" fill="#89969c" font-size="9">${safeText(d.label)}</text>`).join("");
  const dots = points.map((d, i) => `<circle cx="${x(i)}" cy="${y(d.value)}" r="3.5" fill="#fff" stroke="#4bb98e" stroke-width="2"><title>${safeText(d.label)}: ${safeText(fmt.format(d.value))}</title></circle>`).join("");
  root.innerHTML = `<svg class="trend-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="Annual sales by model year">${grid}<path d="${area}" fill="#51bc9130"/><path d="${path}" fill="none" stroke="#3cae80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

function drawDonut(data) {
  const counts = aggregate(data, "battery", "id", "count").sort((a, b) => b.value - a.value);
  const total = counts.reduce((n, d) => n + d.value, 0);
  if (!total) {
    byId("battery-chart").innerHTML = '<div class="chart-empty">No records for this selection</div>';
    byId("battery-legend").innerHTML = "";
    return;
  }
  const radius = 62, circumference = 2 * Math.PI * radius;
  let offset = 0;
  const arcs = counts.map((d, i) => {
    const length = d.value / total * circumference;
    const element = `<circle cx="100" cy="100" r="${radius}" fill="none" stroke="${COLORS[i % COLORS.length]}" stroke-width="17" stroke-dasharray="${length} ${circumference - length}" stroke-dashoffset="${-offset}" transform="rotate(-90 100 100)"><title>${safeText(d.label)}: ${fmt.format(d.value)} records</title></circle>`;
    offset += length;
    return element;
  }).join("");
  byId("battery-chart").innerHTML = `<svg class="donut-svg" viewBox="0 0 200 200" role="img" aria-label="Vehicle record mix by battery technology">${arcs}<text x="100" y="95" text-anchor="middle" fill="#26353d" font-family="Manrope,sans-serif" font-size="20" font-weight="700">${fmt.compact(total)}</text><text x="100" y="115" text-anchor="middle" fill="#8a979c" font-family="DM Sans,sans-serif" font-size="10">VEHICLES</text></svg>`;
  byId("battery-legend").innerHTML = counts.map((d, i) => `<div class="legend-row"><span class="legend-dot" style="background:${COLORS[i % COLORS.length]}"></span><span>${safeText(d.label)}</span><strong>${(d.value / total * 100).toFixed(1)}%</strong></div>`).join("");
}

function render() {
  const data = filteredRows();
  const sales = data.map((d) => d.sales).filter((n) => n != null);
  const ranges = data.map((d) => d.range).filter((n) => n != null);
  const ratings = data.map((d) => d.rating).filter((n) => n != null);
  byId("kpi-records").textContent = fmt.format(data.length);
  byId("kpi-sales").textContent = fmt.compact(sales.reduce((a, b) => a + b, 0));
  byId("kpi-range").innerHTML = `${ranges.length ? fmt1.format(avg(ranges)) : "—"}<small>km</small>`;
  byId("kpi-rating").innerHTML = `${ratings.length ? avg(ratings).toFixed(2) : "—"}<small>/ 5</small>`;
  byId("kpi-records-note").textContent = `${fmt.format(data.length)} records in current selection`;
  drawBars("category-chart", aggregate(data, "category", "sales"), { color: "", limit: 15, format: (n) => fmt.compact(n) });
  const totalSales = sales.reduce((a, b) => a + b, 0);
  drawBars("manufacturer-chart", aggregate(data, "manufacturer", "sales"), { color: "blue", limit: 10, format: (n) => `${fmt.compact(n)} · ${totalSales ? (n / totalSales * 100).toFixed(1) : "0.0"}%` });
  drawTrend(data);
  drawDonut(data);
  drawBars("range-chart", aggregate(data, "category", "range", "avg"), { color: "purple", limit: 12, format: (n) => `${fmt1.format(n)} km` });
  drawBars("country-chart", aggregate(data, "country", "sales"), { color: "amber", limit: 10, format: (n) => fmt.compact(n) });
  byId("footer-count").textContent = `${fmt.format(data.length)} filtered rows`;
}

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Dataset request returned ${response.status}`);
    if (!("DecompressionStream" in window)) throw new Error("This browser cannot unpack the compressed data file");
    const binary = atob((await response.text()).trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const decompressed = new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip")));
    const parsed = parseCSV(await decompressed.text());
    rows = parsed.map((item) => ({
      id: item[fields.id], manufacturer: item[fields.manufacturer], year: item[fields.year],
      country: item[fields.country], category: item[fields.category], battery: item[fields.battery],
      capacity: number(item[fields.capacity]), range: number(item[fields.range]),
      sales: number(item[fields.sales]), rating: number(item[fields.rating])
    }));
    populateFilter("filter-year", "year");
    populateFilter("filter-category", "category");
    populateFilter("filter-manufacturer", "manufacturer");
    populateFilter("filter-battery", "battery");
    populateFilter("filter-country", "country");
    const years = rows.map((r) => Number(r.year)).filter(Number.isFinite);
    const yearBounds = years.reduce((bounds, year) => [Math.min(bounds[0], year), Math.max(bounds[1], year)], [Infinity, -Infinity]);
    byId("year-range").textContent = `${yearBounds[0]} — ${yearBounds[1]}`;
    byId("snapshot-date").textContent = `${fmt.format(rows.length)} vehicle records`;
    byId("source-status").textContent = `${fmt.format(rows.length)} records loaded`;
    setupStory();
    byId("clear-filters").addEventListener("click", clearFilters);
    byId("reset-button").addEventListener("click", clearFilters);
    render();
  } catch (error) {
    byId("source-status").textContent = "Dataset unavailable";
    document.querySelector(".kpi-grid").innerHTML = `<div class="error-banner" style="grid-column:1/-1">Could not load the dataset. Serve this repository over HTTP (for example, run <code>python3 -m http.server 8000</code> from its root) and reopen the page. ${safeText(error.message)}</div>`;
  }
}

function setupStory() {
  const tabs = byId("story-tabs");
  tabs.innerHTML = storyPoints.map((point, index) => `<button class="story-tab${index === activeStory ? " active" : ""}" role="tab" aria-selected="${index === activeStory}" aria-label="Story point ${index + 1}: ${safeText(point.title)}" data-story="${index}">${String(index + 1).padStart(2, "0")}</button>`).join("");
  tabs.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => selectStory(Number(button.dataset.story))));
  byId("story-next").addEventListener("click", () => selectStory((activeStory + 1) % storyPoints.length));
  updateStory();
}

function selectStory(index) {
  activeStory = (index + storyPoints.length) % storyPoints.length;
  updateStory();
  if (activeStory > 0) {
    const target = byId(storyPoints[activeStory].target);
    target?.closest(".panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  } else byId("overview").scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateStory() {
  const point = storyPoints[activeStory];
  byId("story-position").innerHTML = `${String(activeStory + 1).padStart(2, "0")} <i>/ ${String(storyPoints.length).padStart(2, "0")}</i>`;
  byId("story-title").textContent = point.title;
  byId("story-caption").textContent = point.caption;
  byId("story-tabs").querySelectorAll("button").forEach((button, index) => {
    const selected = index === activeStory;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
}

function clearFilters() {
  ["filter-year", "filter-category", "filter-manufacturer", "filter-battery", "filter-country"].forEach((id) => { byId(id).value = ""; });
  render();
  const toast = byId("toast");
  toast.textContent = "All filters cleared";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

fmt.compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format;
init();
