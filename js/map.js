// Map instance
let map = null;
let markers = [];
let currentCategory = 'all';

// Initializes the map when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initLocationList();
    initCategoryFilter();
    initSearch();
});

// Initializes Leaflet map
function initMap() {
    const mapContainer = document.getElementById('campusMap');
    if (!mapContainer) return;

    // Coordinates for center of campus
    const campusCenter = [41.97500405553513, -87.71087734262848];

    map = L.map('campusMap', {
        center: campusCenter,
        zoom: 16,
        zoomControl: false
    });

    // Adds OpenStreetMap tiles to map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Adds custom zoom control in bottom right
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Adds all location markers
    addMarkers(campusLocations);

    // Sets up custom map controls
    setupMapControls();
}

// Adds markers to the map
function addMarkers(locations) {
    // Clears existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Creates custom icons based on category assigned
    const iconColors = {
        'academic': '#002855',
        'dining': '#FFD100',
        'housing': '#28a745',
        'recreation': '#dc3545',
        'parking': '#6c757d'
    };
    
    locations.forEach(location => {
        const iconColor = iconColors[location.category] || '#002855';
        
        // Creates custom marker icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background-color: ${iconColor};
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 14px;
                ">
                    <i class="fas fa-${location.icon}"></i>
                </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        // Creates marker
        const marker = L.marker([location.lat, location.lng], {
            icon: customIcon,
            title: location.name
        }).addTo(map);
        
        // Creates popup content for marker
        const popupContent = `
            <div class="map-popup">
                <h3>${location.name}</h3>
                <span class="category-badge ${location.category}">${getCategoryName(location.category)}</span>
                <p>${location.description}</p>
                <button class="btn btn-primary btn-sm" onclick="getDirections(${location.lat}, ${location.lng})">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Stores marker reference
        markers.push({
            marker: marker,
            location: location
        });
    });
}

// Initializes the locations list sidebar
function initLocationList() {
    const listContainer = document.getElementById('locationsList');
    if (!listContainer) return;

    renderLocationsList(campusLocations);
}

// Renders locations list
function renderLocationsList(locations) {
    const listContainer = document.getElementById('locationsList');
    if (!listContainer) return;

    if (locations.length === 0) {
        listContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-map-marker-times"></i>
                <p>No locations found</p>
            </div>
        `;
        return;
    }

    // Sorts locations alphabetically
    const sortedLocations = [...locations].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    listContainer.innerHTML = sortedLocations.map(location => `
        <div class="location-item"
            data-id="${location.id}"
            data-category="${location.category}"
            role="button"
            tabindex="0"
            aria-label="${location.name}, ${getCategoryName(location.category)}">
            <div class="location-category">${getCategoryName(location.category)}</div>
            <h3>${location.name}</h3>
            <p>${location.description}</p>
        </div>
    `).join('');
    
    // Adds click events to the location items
    const locationItems = listContainer.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        item.addEventListener('click', function() {
            const locationId = parseInt(this.dataset.id);
            focusLocation(locationId);
        });
        
        // Keyboard support
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const locationId = parseInt(this.dataset.id);
                focusLocation(locationId);
            }
        });
    });
}

function focusLocation(locationId) {
    const location = campusLocations.find(loc => loc.id === locationId);
    if (!location) return;

    // Finds the correspoonding marker to location
    const markerObj = markers.find(m => m.location.id === locationId);
    if (!markerObj) return;

    // Move/Pan map to location and open info popup
    map.setView([location.lat, location.lng], 18, {
        animate: true,
        duration: 1
    });

    setTimeout(() => {
        markerObj.marker.openPopup();
    }, 500);

    // Highlights location in location list
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`.location-item[data-id="${locationId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initializes category filter buttons
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Updates active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filters locations
            const category = this.dataset.category;
            currentCategory = category;
            filterLocations(category);
        });
    });
}

// Filters locations by category
function filterLocations(category) {
    let filteredLocations = campusLocations;

    if (category !== 'all') {
        filteredLocations = campusLocations.filter(loc => loc.category === category);
    }

    // Updates map markers
    addMarkers(filteredLocations);

    // Updates location list
    renderLocationsList(filteredLocations);

    // Zoom/move map to show all filtered markers
    if (filteredLocations.length > 0) {
        const group = L.featureGroup(markers.map(m => m.marker));
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Initializes location search functionality
function initSearch() {
    const searchInput = document.getElementById('locationSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchLocations(query); 
    });
}

// Logic for searches by name or description
function searchLocations(query) {
    if (!query) {
        // If search is empty filter by current category
        filterLocations(currentCategory);
        return;
    }
    
    let searchResults = campusLocations.filter(loc => {
        return loc.name.toLowerCase().includes(query) ||
               loc.description.toLowerCase().includes(query);
    });
    
    // Applies category filter if not 'all'
    if (currentCategory !== 'all') {
        searchResults = searchResults.filter(loc => loc.category === currentCategory);
    }
    
    // Updates map markers and list locations
    addMarkers(searchResults);
    renderLocationsList(searchResults);
    
    // Fits map to search results
    if (searchResults.length > 0) {
        const group = L.featureGroup(markers.map(m => m.marker));
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Sets up custom map controls
function setupMapControls() {
    const resetViewBtn = document.getElementById('resetView');
    const myLocationBtn = document.getElementById('myLocation');

    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', () => {
            map.setView([41.97500405553513, -87.71087734262848], 16, {
                animate: true
            });
        });
    }

    if (myLocationBtn) {
        myLocationBtn.addEventListener('click', () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;

                        // Adds marker for user location
                        L.marker([userLat, userLng], {
                            icon: L.divIcon({
                                className: 'user-location-marker',
                                html: '<div style="background-color: #007bff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8pxrgba(0,0,0,0.3);"></div>',
                                iconSize: [20, 20],
                                iconAnchor: [10, 10]
                            })
                        }).addTo(map).bindPopup('You are here').openPopup();

                        map.setView([userLat, userLng], 17);
                    },
                    (error) => {
                        alert('Unable to get your location. Please check your browser settings.');
                        console.error('Geolocation error:', error);
                    }
                )
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    }
}

// Get directions to a location
function getDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}`
    window.open(url, '_blank');
}

// Gets category display name
function getCategoryName(category) {
    const categories = {
        'academic': 'Academic',
        'dining': 'Dining',
        'housing': 'Housing',
        'recreation': 'Recreation',
        'parking': 'Parking'
    };
    return categories[category] || category;
}