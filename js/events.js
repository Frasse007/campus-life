// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initEventsList();
    initEventsFilter();
});

// Initializes the events list
function initEventsList() {
    const eventsListContainer = document.getElementById('eventsList');
    if (!eventsListContainer) return;

    // Gets the events data from eventsData.js
    const events = typeof eventsData !== 'undefined' ? eventsData : [];

    renderEventsList(events);
}

// Handles clicking on day in calendar grid
function handleDayClick(dateString) {
    selectedDate = dateString;

    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    document.querySelector(`.calendar-day[data-date="${dateString}"]`)?.classList.add('selected');

    const dayEvents = getEventsForDate(dateString);

    // Filters the event list
    renderEventsList(dayEvents, dateString);
}

// Renders the events list
function renderEventsList(events, dateString = null) {
    const eventsListContainer = document.getElementById('eventsList');
    if (!eventsListContainer) return;

    // Response if no events items are found
    if (events.length === 0) {
    eventsListContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-calendar-times"></i>
            <p>${selectedDate ? `No events on ${formatDate(dateString)}` : 'No events found for this month'}</p>
            ${selectedDate ? `<button onclick="resetEventsFilter()" id="reset-filter-btn">View all events</button>` : ''}
        </div>
    `;
    return;
}

    // Sorts events by date
    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Response if events item is found
    eventsListContainer.innerHTML = sortedEvents.map(event => `
        <article class="event-item"
                onclick="window.location.href='/pages/events/article.html?type=event&id=${event.id}'"
                role="button"
                tabindex="0"
                data-category="${event.category}">
            <img src="${event.image}" alt="${event.title}" loading="lazy">
            <div class="event-item-content">
                <span class="category-badge ${event.category}">${getCategoryName(event.category)}</span>
                <h3>${event.title}</h3>
                <div class="event-date-time">
                    <span><i class="fas fa-calendar-alt"></i> ${formatDate(event.date)}</span>
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                </div>
                <p class="event-location">
                    <i class="fas fa-map-marker-alt"></i> ${event.location}
                </p>
            </div>
        </article>
        `).join('');

    // Adds keyboard navigation for accesibility
    const eventItems = eventsListContainer.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.addEventListener('keypress', function(e) {
            if (e.key == 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Resets the event filter
function resetEventsFilter() {
    selectedDate = null;
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    renderEventsList(eventsData);
}

// Initializes the event filter
function initEventsFilter() {
    const filterSelect = document.getElementById('eventFilter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', function() {
        const category = this.value;
        filterEvents(category);
    });
}

// Filters events by category
function filterEvents(category) {
    let filteredEvents = eventsData;

    if (category !== 'all') {
        filteredEvents = eventsData.filter(event => event.category === category);
    }

    renderEventsList(filteredEvents);
}

// Get nicely formatted category names
function getCategoryName(category) {
    const categories = {
        'academic': 'Academic',
        'athletics': 'Athletics',
        'social': 'Social',
        'cultural': 'Cultural'
    };
    return categories[category] || category;
}

// Get nicely formatted date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}