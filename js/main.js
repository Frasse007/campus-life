// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initSidebar();
    initAnimatedNumbers();
    initAccessibility();
    console.log('NPU Campus Life initialized successfully');
});

// Opens/closes the sidebar menu smoothly
function initSidebar() {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');

    // Checks that menuBtn and sidebar exists
    if (!menuBtn || !sidebar) return;

    // Opens sidebar
    menuBtn.addEventListener('click', function() {
        openSidebar();
    });

    // Checks if it exists and closes sidebar
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            closeSidebarFunc();
        });
    }

    // Checks if it exists and closes sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeSidebarFunc();
        });
    }

    // Closes sidebar on 'Esc' key for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    });

    // Toggle state for when sidebar is open and prevent scrolling
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    // Toggle state for when sidebar gets closed and re-enable scrolling
    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Animates number counter to give life to page
function initAnimatedNumbers() {
    const statElements = document.querySelectorAll('.stat-number');
    // Checks that statElements are found
    if (statElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            const element = entry.target;

            // Gets specific target number from data-target attrib
            const target = parseInt(element.getAttribute('data-target'));

            // Runs animation for specific element
            animateNumber(element, target, 2000);

            // Stops watching once animated
            observer.unobserve(element);
            }
        });
        // Starts when 50% is done
    }, { threshold: 0.5 });

    // Ensures observer watches each statElement
    statElements.forEach(el => observer.observe(el));
}

function animateNumber(element, target, duration) {
    const startTimestamp = performance.now();

    // Calculates how far through duration it currently is and slows down speed closer to finish
    const step = (currentTimeStamp) => {
        const progress = Math.min((currentTimeStamp - startTimestamp) / duration, 1);
        const slowProgress = 1 - (1 - progress) * (1 - progress);
        const currentNumber = Math.floor(slowProgress * target);

        // Updates text on page
        element.textContent = currentNumber.toLocaleString()

        // Continues animation if number is not complete
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Improves keyboard navigation and screen reader support
function initAccessibility() {
    announcePageLoad();
    trapfocusInSidebar();
    enhanceKeyboardNav();
}

// Announces page load to screen readers
function announcePageLoad() {
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        // Creates a visually hidden announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = `Page loaded: ${pageTitle.textContent}`;
        document.body.appendChild(announcement);
        
        // Removes again after announcement
        setTimeout(() => announcement.remove(), 1000);
    }
}

// Traps focus within sidebar if it is open
function trapFocusInSidebar() {
    const sidebar = document.getElementById('sidebar');
    // Checks that the sidebar exists
    if (!sidebar) return;
    
    // Locks 'Tab' scrolling to sidebar elements only
    sidebar.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        
        const focusableElements = sidebar.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Shift + Tab on first element
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
        // Tab on last element
        else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    });
}

// Improves keyboard navigation for custom made interactive elements
function enhanceKeyboardNav() {
    // Make cards keyboard accessible
    const cards = document.querySelectorAll('.feature-card, .news-item, .event-item, .location-item');
    
    cards.forEach(card => {
        // Adds 'Tab' scrolling if not already present
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        
        // Add keyboard selection
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                } else {
                    card.click();
                }
            }
        });
    });
}