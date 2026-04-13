document.addEventListener('DOMContentLoaded', () => {
    // Gets the ID from the URL and type of item
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = Number(urlParams.get('id'));
    const type = urlParams.get('type');

    // Initiates dataItem variable and decide what array to use to find specific article
    let dataItem = null;
    if (type === 'news') {
        dataItem = newsData.find(item => item.id === articleId);
    } else if (type === 'event') {
        dataItem = eventsData.find(item => item.id === articleId);
    }

    // Displays article if found
    if (dataItem) {
        renderArticle(dataItem, type);
    } else {
        // Handles "Article Not Found" case
        document.getElementById('main-content').innerHTML = `
            <div class="container">
                <h1>Content not found</h1>
                <a href="/campus-life/pages/news/index.html" class="btn btn-outline">
                    <i class="fas fa-arrow-left"></i> Back to All News
                </a>
            </div>`;
    }
});

// Function to display article
function renderArticle(item, type) {
    document.title = `${item.title} - NPU Campus Life`;

    if (type === 'news') {
        renderNews(item);
    } else if (type === 'event') {
        renderEvent(item);
    }
}

// News Articles
function renderNews(item) {
    // Category badge
    const categoryEl = document.getElementById('newsCategory');
    if (categoryEl && item.category) {
        categoryEl.innerHTML = `
            <span class="category-badge ${item.category.toLowerCase()}">
                ${item.category}
            </span>`;
    }

    // Title
    document.getElementById('articleTitle').textContent = item.title;

    // Meta row
    const metaEl = document.getElementById('articleMeta');
    if (metaEl) {
        metaEl.innerHTML = `
            ${item.date ? `
                <span class="article-date">
                    <i class="fas fa-calendar-alt"></i>
                    <time datetime="${item.date}">${formatDisplayDate(item.date)}</time>
                </span>` : ''}
            ${item.author ? `
                <span class="article-author">
                    <i class="fas fa-user"></i>
                    By ${item.author}
                </span>` : ''}
            ${item.readTime ? `
                <span class="article-reading-time">
                    <i class="fas fa-clock"></i>
                    ${item.readTime}
                </span>` : ''}`;
    }

    // Image
    const imgEl = document.getElementById('articleImage');
    if (imgEl) {
        imgEl.src = item.image || '';
        imgEl.alt = item.imageAlt || item.title;
    }

    // Body
    document.getElementById('articleDescription').innerHTML =
        item.fullContent || item.fullDescription || '';
}

// Event Articles
function renderEvent(item) {
    // Category badge
    const categoryEl = document.getElementById('eventCategory');
    if (categoryEl && item.category) {
        categoryEl.innerHTML = `
            <span class="category-badge ${item.category.toLowerCase()}">
                ${item.category}
            </span>`;
    }

    // Title
    document.getElementById('articleTitle').textContent = item.title;

    // Image
    const imgEl = document.getElementById('articleImage');
    if (imgEl) {
        imgEl.src = item.image || '';
        imgEl.alt = item.imageAlt || item.title;
    }

    // Sidebar — core date/time/location fields
    setText('eventDate', formatDisplayDate(item.date));
    setText('eventTime', item.time);
    setText('eventLocation', item.location);

    // "View on map" link inside location block
    const mapLink = document.getElementById('eventMapLink');
    if (mapLink) {
        mapLink.style.display = item.location ? 'inline' : 'none';
    }

    // Description
    document.getElementById('articleDescription').innerHTML =
        item.fullDescription || item.fullContent || '';
}

// Safely sets text content if the element exists
function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
}

// Shows/hides optional sidebar info items that have a wrapper element
function setOptionalInfoItem(id, value, iconClass, label) {
    const wrapper = document.getElementById(id);
    if (!wrapper) return;
    if (value) {
        wrapper.style.display = '';
        // Update the <p> inside if it exists
        const p = wrapper.querySelector('p');
        if (p) {
            p.textContent = value;
        } else {
            wrapper.innerHTML = `
                <div class="info-icon"><i class="fas ${iconClass}"></i></div>
                <div class="info-details">
                    <strong>${label}</strong>
                    <p>${value}</p>
                </div>`;
        }
    } else {
        wrapper.style.display = 'none';
    }
}

// Converts "2026-02-20" → "February 20, 2026"
function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    const parsed = new Date(dateStr + 'T00:00:00');
    if (isNaN(parsed)) return dateStr;
    return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}