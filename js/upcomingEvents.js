document.addEventListener('DOMContentLoaded', function () {
    initUpcomingEvents();
});

const UPCOMING_EVENTS_LIMIT = 3;

function initUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    if (!container) return;

    const events = typeof eventsData !== 'undefined' ? eventsData : [];

    if (events.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-calendar-times"></i>
                <p>No upcoming events found.</p>
            </div>`;
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter to today/future events only and sort ascending
    const upcoming = events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, UPCOMING_EVENTS_LIMIT);

    if (upcoming.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-calendar-times"></i>
                <p>No upcoming events this month.</p>
            </div>`;
        return;
    }

    container.innerHTML = upcoming.map(event => `
        <article class="event-item"
                onclick="window.location.href='/campus-life/pages/events/article.html?type=event&id=${event.id}'"
                role="button"
                tabindex="0"
                data-category="${event.category}">
            <img src="${event.image}" alt="${event.title}" loading="lazy">
            <div class="event-item-content">
                <span class="category-badge ${event.category}">${getUpcomingCategoryName(event.category)}</span>
                <h3>${event.title}</h3>
                <div class="event-date-time">
                    <span><i class="fas fa-calendar-alt"></i> ${formatUpcomingDate(event.date)}</span>
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                </div>
                <p class="event-location">
                    <i class="fas fa-map-marker-alt"></i> ${event.location}
                </p>
            </div>
        </article>
        `).join('');

        // Accessibility for keyboard
        container.querySelectorAll('.event-item').forEach(item => {
            item.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' || e.key === '') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
}