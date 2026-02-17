// Default calendar state
let currentDate = new Date();
let selectedDate = null;

// Initializes calendar when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
});

// Initialize the calendar
function initCalendar() {
    renderCalendar();
    setupCalendarControls();
}

// Renders calendar for the current month
function renderCalendar() {
    const calendarTitle = document.getElementById('currentMonth');
    const calendarDays = document.getElementById('calendarDays');

    // Checks that the calendar exists
    if (!calendarTitle || !calendarDays) return;

    // Updates the month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    calendarTitle.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Constants to use for grid generation
    // Calculates calendar grid
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();
    
    // Last day of previous month
    const prevLastDay = new Date(year, month, 0);
    const prevLastDate = prevLastDay.getDate();

    // Initialize empty HTML to build calendar
    let daysHTML = '';

    // Fills calendar with previous month's days depending on day of the week new month starts
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = prevLastDate - i;
        const prevMonthDate = new Date(year, month - 1, day);
        const dateString = formatDateForComparison(prevMonthDate);
        daysHTML += `
            <div class="calendar-day other-month" data-date="${dateString}">
                <span class="day-number">${day}</span>
            </div>
        `;
    }

    // Fills calendar with current month's days
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    // Loops from day 1 of month until last day of month and adds them to calendar with any existing events
    for (let day = 1; day <= lastDate; day++) {
        const date = new Date(year, month, day);
        const dateString = formatDateForComparison(date);
        const dayEvents = getEventsForDate(dateString);
        
        const isToday = isCurrentMonth && day === today.getDate();
        const hasEvents = dayEvents.length > 0;
        
        let dayClasses = 'calendar-day';
        if (isToday) dayClasses += ' today';
        if (hasEvents) dayClasses += ' has-events';
        
        daysHTML += `
            <div class="${dayClasses}" 
                 data-date="${dateString}" 
                 role="button"
                 tabindex="0"
                 aria-label="${day} ${monthNames[month]}${hasEvents ? ', has events' : ''}">
                <span class="day-number">${day}</span>
                ${hasEvents ? `<span class="event-dot ${dayEvents[0].category}"></span>` : ''}
            </div>
        `;
    }
    
    // Fills remaining cells of grid with next month's days
    const totalCells = daysHTML.match(/calendar-day/g).length;
    const remainingCells = 42 - totalCells;
    
    // Loops from first day of next month until grid is full and adds them to calendar
    for (let day = 1; day <= remainingCells; day++) {
        const nextMonthDate = new Date(year, month + 1, day);
        const dateString = formatDateForComparison(nextMonthDate);
        daysHTML += `
            <div class="calendar-day other-month" data-date="${dateString}">
                <span class="day-number">${day}</span>
            </div>
        `;
    }
    
    // Builds calendar grid in HTML
    calendarDays.innerHTML = daysHTML;

    // Adds click events to each day of current month in calendar grid
    const dayElements = calendarDays.querySelectorAll('.calendar-day:not(.other-month)');
    dayElements.forEach(dayEl => {
        dayEl.addEventListener('click', function() {
            handleDayClick(this.dataset.date);
        });

        // Keyboard support for accessibility
        dayEl.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDayClick(this.dataset.date);
            }
        });
    });
}

// Creates calendar navigation controls
function setupCalendarControls() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayMonth');

    // Goes to previous month if button is clicked
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    // Goes to next month if button is clicked
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    // Goes to current month if button is clicked
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            currentDate = new Date();
            renderCalendar();
        });
    }
}

// Gets event for a specific date
function getEventsForDate(dateString) {
    return eventsData.filter(event => event.date === dateString);
}

// Formats date to (YYYY-MM-DD) for comparison
function formatDateForComparison(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}