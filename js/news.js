// Carousel state
let currentSlide = 0;
let autoplayInterval = null;
let isAutoplayActive = true;
const AUTOPLAY_DELAY = 10000;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initNewsCarousel();
    initNewsList();
    initNewsFilter();
});

function initNewsCarousel() {
    const carouselContainer = document.getElementById('newsCarousel');
    if (!carouselContainer) return;

    // Gets the latest 5 news items to display in carousel
    const latestNews = newsData.slice(0, 5);

    // Builds carousel HTML
    carouselContainer.innerHTML = latestNews.map((news, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
            <div class="carousel-content">
                <span class="category-badge ${news.category}">${getCategoryName(news.category)}</span>
                <h2>${news.title}</h2>
                <div class="news-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${formatDate(news.date)}</span>
                    <span><i class="fas fa-user"></i> ${news.author}</span>
                </div>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="/campus-life/pages/news/article.html?type=news&id=${news.id}" class="btn btn-primary">Read More</a>
            </div>
        </div>
    `).join('');

    // Builds indicators
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = latestNews.map((_, index) => `
            <button 
                class="carousel-indicator ${index === 0 ? 'active' : ''}" 
                data-index="${index}"
                aria-label="Go to slide ${index + 1}"
                role="tab"
                aria-selected="${index === 0}"
            ></button>
        `).join('');

        // Adds click events to indicators
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                goToSlide(index);
            });
        });
    }

    // Sets up navigation buttons
    const prevBtn = document.getElementById('prevNews');
    const nextBtn = document.getElementById('nextNews');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            previousSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }

    // Start autoplay of news
    startAutoplay();

    // Pause autoplay on hover
    carouselContainer.addEventListener('mouseenter', () => {
        if (isAutoplayActive) {
            pauseAutoplay();
        }
    });

    carouselContainer.addEventListener('mouseleave', () => {
        if (isAutoplayActive) {
            startAutoplay();
        }
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Navigate to a specific slide
function goToSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');

    if (items.length === 0) return;

    // Resets & removes active class from all items
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(ind => {
        ind.classList.remove('active');
        ind.setAttribute('aria-selected', 'false');
    });

    // Adds active class to current item
    currentSlide = index;
    items[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
        indicators[currentSlide].setAttribute('aria-selected', 'true');
    }

    // Resets autoplay
    if (isAutoplayActive) {
        pauseAutoplay();
        startAutoplay();
    }
}

// Go to next slide
function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    const nextIndex = (currentSlide + 1) % items.length;
    goToSlide(nextIndex);
}

// Go to previous slide
function previousSlide() {
    const items = document.querySelectorAll('.carousel-item');
    const prevIndex = (currentSlide - 1 + items.length) % items.length;
    goToSlide(prevIndex);
}

// Start carousel autoplay 10 seconds per slide
function startAutoplay() {
    // Clear any existing interval
    pauseAutoplay();
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
}

// Pause carousel autoplay
function pauseAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Initializes the news list display
function initNewsList() {
    const newsListContainer = document.getElementById('newsList');
    if (!newsListContainer) return;
    renderNewsList(newsData);
}

// Renders the news list
function renderNewsList(newsItems) {
    const newsListContainer = document.getElementById('newsList');
    if (!newsListContainer) return;

    // Response if no news items are found
    if (newsItems.length === 0) {
        newsListContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No news articles found</p>
            </div>
        `;
        return;
    }

    // Response if news items are found
    newsListContainer.innerHTML = newsItems.map(news => `
        <article class="news-item" onclick="window.location.href='/campus-life/pages/news/article.html?type=news&id=${news.id}'" role="button" tabindex="0">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
            <div class="news-item-content">
                <span class="category-badge ${news.category}">${getCategoryName(news.category)}</span>
                <h3>${news.title}</h3>
                <p class="date">${formatDate(news.date)}</p>
                <p>${news.excerpt.substring(0, 120)}...</p>
            </div>
        </article>  
    `).join('');
}

// Initializes news filter
function initNewsFilter() {
    const filterSelect = document.getElementById('newsFilter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', function() {
        const category = this.value;
        filterNews(category);
    });
}

// Filters news by category
function filterNews(category) {
    let filteredNews = newsData;

    if (category !== 'all') {
        filteredNews = newsData.filter(news => news.category === category);
    }
    renderNewsList(filteredNews);
}

// Get nicely formatted category names
function getCategoryName(category) {
    const categories = {
        'academics': 'Academics',
        'athletics': 'Athletics',
        'events': 'Events',
        'announcements': 'Announcements'
    };
    return categories[category] || category;
}

// Get nicely formatted date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}