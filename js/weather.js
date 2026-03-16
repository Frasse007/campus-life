// Campus Weather through Open-Meteo
async function loadCampusWeather() {
    const container = document.getElementById('weatherWidget');
    if (!container) return;

    // Coordinates for North Park University Campus
    const LAT = 41.9881;
    const LON = -87.7089;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}`
        + `&current=temperature_2m,apparent_temperature,relative_humidity_2m,`
        + `wind_speed_10m,wind_direction_10m,precipitation,weather_code,is_day`
        + `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America/Chicago`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        const c = data.current;

        container.innerHTML = `
            <div class="weather-card">
                <div class="weather-main">
                    <div>
                        <div class="weather-temp-block">
                            <span class="weather-temp">${Math.round(c.temperature_2m)}</span>
                            <span class="weather-temp-unit">°F</span>
                        </div>
                        <div class="weather-condition">${wmoDescription(c.weather_code, c.is_day)}</div>
                        <div class="weather-location">North Park University &mdash; Chicago, IL</div>
                    </div>
                    <div class="weather-icon-large">${wmoIcon(c.weather_code, c.is_day)}</div>
                </div>
                <div class="weather-stats">
                    <div class="weather-stat">
                        <i class="fas fa-temperature-low"></i>
                        <span class="weather-stat-value">${Math.round(c.apparent_temperature)}°F</span>
                        <span class="weather-stat-label">Feels Like</span>
                    </div>
                    <div class="weather-stat">
                        <i class="fas fa-droplet"></i>
                        <span class="weather-stat-value">${c.relative_humidity_2m}%</span>
                        <span class="weather-stat-label">Humidity</span>
                    </div>
                    <div class="weather-stat">
                        <i class="fas fa-wind"></i>
                        <span class="weather-stat-value">${Math.round(c.wind_speed_10m)} mph</span>
                        <span class="weather-stat-label">Wind</span>
                    </div>
                    <div class="weather-stat">
                        <i class="fas fa-cloud-rain"></i>
                        <span class="weather-stat-value">${c.precipitation}"</span>
                        <span class="weather-stat-label">Precipitation</span>
                    </div>
                </div>
                <div class="weather-updated">Updated ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
            </div>`;
    } catch (err) {
        container.innerHTML = `<div class="weather-error"><i class="fas fa-triangle-exclamation"></i><p>Weather data unavailable. Please try again later.</p></div>`;
    }
}

function wmoDescription(code, isDay) {
    const map = {
        0: ['Clear Sky', 'Clear Sky'],
        1: ['Mostly Clear', 'Mostly Clear'], 2: ['Partly Cloudy', 'Partly Cloudy'], 3: ['Overcast', 'Overcast'],
        45: ['Foggy', 'Foggy'], 48: ['Icy Fog', 'Icy Fog'],
        51: ['Light Drizzle', 'Light Drizzle'], 53: ['Drizzle', 'Drizzle'], 55: ['Heavy Drizzle', 'Heavy Drizzle'],
        61: ['Light Rain', 'Light Rain'], 63: ['Rain', 'Rain'], 65: ['Heavy Rain', 'Heavy Rain'],
        71: ['Light Snow', 'Light Snow'], 73: ['Snow', 'Snow'], 75: ['Heavy Snow', 'Heavy Snow'],
        77: ['Snow Grains', 'Snow Grains'],
        80: ['Light Showers', 'Light Showers'], 81: ['Showers', 'Showers'], 82: ['Heavy Showers', 'Heavy Showers'],
        85: ['Snow Showers', 'Snow Showers'], 86: ['Heavy Snow Showers', 'Heavy Snow Showers'],
        95: ['Thunderstorm', 'Thunderstorm'], 96: ['Thunderstorm w/ Hail', 'Thunderstorm w/ Hail'], 99: ['Severe Thunderstorm', 'Severe Thunderstorm']
    };
    return (map[code] || ['Unknown', 'Unknown'])[0];
}

function wmoIcon(code, isDay) {
    if (code === 0) return isDay ? '☀️' : '🌙';
    if (code <= 2) return isDay ? '🌤️' : '🌤️';
    if (code === 3) return '☁️';
    if (code <= 48) return '🌫️';
    if (code <= 55) return '🌦️';
    if (code <= 65) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌧️';
    if (code <= 86) return '🌨️';
    return '⛈️';
}

document.addEventListener('DOMContentLoaded', loadCampusWeather);