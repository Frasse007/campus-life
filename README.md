# NPU Campus Life
A multi-page campus companion web app for North Park University students featuring live weather, campus news, events with a calendar view and an interactive campus map

**Live Site:** https://frasse007.github.io/campus-life/index.html

## Project Overview
This app gives NPU students a single place to:
- **Campus News**: Browse and read articles across academic, athletics, and announcement categories
- **Events**: View upcoming events, filter by category, and navigate an interactive calendar
- **Campus Map**: Find any building or lot on campus with category filters and a search bar
- **Live Weather**: See real-time conditions for the NPU campus pulled from the Open-Meteo API

## Setup

### Prerequisites
- A local web server

### Running Locally

**Option 1 — VS Code Live Server (recommended)**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Open the project folder in VS Code
3. Click **Go Live** in the status bar

**Option 2 — Python**
```bash
python3 -m http.server 8080
```

### Live Deployment
The app is hosted on GitHub Pages with no build step required.

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to the `main` branch and `/ (root)` folder
4. GitHub Pages will publish the site automatically

## Features

### Home Page
- Live weather widget (temperature, feels-like, humidity, wind, precipitation)
- Animated stat counters that trigger on scroll
- Upcoming events strip linking to the full events page
- Slide-in navigation sidebar (closes on overlay click or `Esc`)

### Events Page
- Event cards with image, date, time, location, and category
- Filter by category (academic, social, cultural, athletics)
- Interactive month calendar days with events show a color dot, click to see what's on
- Full event detail page loaded dynamically from `eventsData.js`

### News Page
- News article cards with excerpt, author, date, and category
- Filter by category (academic, athletics, announcements, events)
- Full article detail page loaded dynamically from `newsData.js`

### Campus Map
- Interactive Leaflet map with 30+ locations across campus
- Color-coded markers by category (academic, housing, services, athletics, recreation, parking)
- Click a marker for a popup with building info and a **Get Directions** link
- Location list sidebar, category filter tabs, and a search bar

## Adding Content
All data lives in plain JS files in the `data/` folder - no backend or rebuild needed currently.

| File | Contents |
|---|---|
| `data/campusLocations.js` | Campus locations with coordinates, category, and icon |
| `data/eventsData.js` | Events with descriptions, dates, and images |
| `data/newsData.js` | News articles with full HTML content and metadata |

## Technology Stack
- **Markup**: HTML5
- **Styling**: CSS
- **Logic**: JavaScript
- **Map**: Leaflet.js + OpenStreetMap
- **Weather**: Open-Meteo API
- **Icons**: Font Awesome 7
- **Hosting**: GitHub Pages

## Project Structure
```
campus-life/
├── css/
│   └── styles.css
├── data/
│   ├── campusLocations.js 
│   ├── eventsData.js
│   └── newsData.js
├── images/               # Images used on site
├── js/
│   ├── article.js        # Dynamic article/event detail rendering
│   ├── calendar.js       # Calendar logic
│   ├── events.js         # Events page logic
│   ├── main.js           # Sidebar, animated counters, accessibility
│   ├── map.js            # Leaflet map setup and controls
│   ├── news.js           # News page logic
│   ├── upcomingEvents.js # Home page events strip
│   └── weather.js        # Open-Meteo weather widget
├── pages/
│   ├── events/
│   │   ├── article.html
│   │   └── index.html
│   ├── map/
│   │   └── index.html
│   └── news/
│       ├── article.html
│       └── index.html
├── index.html
└── package.json
```

## Potential Future Improvements
- Connect to a CMS or REST API so news and events can be managed without editing code
- Allow students to RSVP to events with a lightweight backend (Firebase, Supabase, etc.)
- Dark mode with `prefers-color-scheme` support and a manual toggle
- Add a dining/cafe section with daily menus and hours
- In-map walking directions between campus buildings using Leaflet Routing Machine

## Author
**Rasmus Westerlund**
- GitHub: [@Frasse007](https://github.com/Frasse007)
