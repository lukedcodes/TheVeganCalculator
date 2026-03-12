document.addEventListener('componentsLoaded', () => {
    // RECOMMENDATIONS is assumed to be loaded from recommendations-data.js

    // Check if we are on index or recommendations page
    const isHomePage = !!document.getElementById('recommended-docs');
    const isRecPage = !!document.getElementById('all-docs');

    if (isHomePage || isRecPage) {
        const docs = RECOMMENDATIONS.filter(d => d.Category === 'Documentary');
        const books = RECOMMENDATIONS.filter(d => d.Category === 'Book');
        const sites = RECOMMENDATIONS.filter(d => d.Category === 'Website');

        if (isHomePage) {
            renderDocs(getHomeItems(docs), document.getElementById('recommended-docs'));
            renderBooks(getHomeItems(books), document.getElementById('recommended-books'));
            renderSites(getHomeItems(sites), document.getElementById('recommended-sites'));
        } else if (isRecPage) {
            renderDocs(docs, document.getElementById('all-docs'));
            renderBooks(books, document.getElementById('all-books'));
            renderSites(sites, document.getElementById('all-sites'));
        }
    }

    function getHomeItems(items) {
        if (items.length <= 4) return items;
        const fixed = items.slice(0, 2);
        const rest = items.slice(2);
        // shuffle rest
        for (let i = rest.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rest[i], rest[j]] = [rest[j], rest[i]];
        }
        return [...fixed, ...rest.slice(0, 2)];
    }

    function processUrl(url) {
        if(!url) return '#';
        if(!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }
        return url;
    }

    function renderDocs(items, container) {
        if(!container) return;
        container.innerHTML = items.map(item => `
            <a href="${processUrl(item['Website Link'])}" target="_blank" class="suggested-card-grid">
                <div class="thumb-grid bg-muted"
                style="background-image: url('assets/recommended/${item['image file name *.jpg']}.jpg'); background-size: cover; background-position: center;">
                </div>
                <div class="card-content-grid">
                <h4 class="card-title justify-center">${item['Name']} <span
                    class="material-symbols-rounded icon-xs">open_in_new</span></h4>
                <p class="card-desc">${item['Short Description']}</p>
                </div>
            </a>
        `).join('');
    }

    function renderBooks(items, container) {
        if(!container) return;
        container.innerHTML = items.map(item => `
            <a href="${processUrl(item['Website Link'])}" target="_blank" class="suggested-card">
                <div class="thumb-book bg-muted"
                style="background-image: url('assets/recommended/${item['image file name *.jpg']}.jpg'); background-size: cover; background-position: center;">
                </div>
                <div class="card-content">
                <h4 class="card-title">${item['Name']} <span
                    class="material-symbols-rounded icon-xs">open_in_new</span></h4>
                <p class="card-author">by ${item['Author / Creator']}</p>
                <p class="card-desc">${item['Short Description']}</p>
                </div>
            </a>
        `).join('');
    }

    function renderSites(items, container) {
        if(!container) return;
        container.innerHTML = items.map(item => `
            <a href="${processUrl(item['Website Link'])}" target="_blank" class="suggested-card-grid">
                <div class="thumb-grid bg-muted"
                style="background-image: url('assets/recommended/${item['image file name *.jpg']}.jpg'); background-size: cover; background-position: center;">
                </div>
                <div class="card-content-grid">
                <h4 class="card-title justify-center">${item['Name']} <span
                    class="material-symbols-rounded icon-xs">open_in_new</span></h4>
                <p class="card-desc">${item['Short Description']}</p>
                </div>
            </a>
        `).join('');
    }
});

