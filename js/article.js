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
        // Handle "Article Not Found" case
        document.getElementById('main-content').innerHTML = `<h1>Content not found</h1>`;
    }
});

// Function to display article
function renderArticle(item, type) {
    // Injects the data into the page for both
    document.getElementById('articleTitle').textContent = item.title;
    document.getElementById('articleImage').src = item.image;
    document.getElementById('articleDescription').innerHTML = item.fullContent || item.fullDescription;
    
    // Specific logic only for events
    if (type === 'event') {
        const eventInfo = document.getElementById('eventInfoSidebar');
        if (eventInfo) eventInfo.style.display = 'block';
        document.getElementById('eventDate').textContent = item.date;
        document.getElementById('eventTime').textContent = item.time;
        document.getElementById('eventLocation').textContent = item.location;
    }
};