// Blog JavaScript Module

// Blog articles data
const blogArticles = [
    {
        id: 7,
        title: "Comment la Respiration Wim Hof Améliore l'Expérience du Bain Glacé",
        excerpt: "Maîtrisez la technique de respiration qui révolutionne la pratique du froid extrême.",
        category: "guide",
        date: "3 Janvier 2024",
        readTime: "6 min",
        image: "images site/images/5016398007798532847.jpg"
    },
    {
        id: 8,
        title: "Bain Glacé vs Cryothérapie : Le Match des Thérapies par le Froid",
        excerpt: "Comparaison détaillée des deux approches pour vous aider à faire le meilleur choix.",
        category: "science",
        date: "1 Janvier 2024",
        readTime: "8 min",
        image: "images site/images/bain-glace-ice.jpg"
    },
    {
        id: 9,
        title: "Les 5 Erreurs à Éviter Absolument dans votre Pratique du Bain Glacé",
        excerpt: "Apprenez des erreurs des autres pour une pratique sûre et efficace dès le début.",
        category: "guide",
        date: "28 Décembre 2023",
        readTime: "5 min",
        image: "images site/images/7.jpg"
    },
    {
        id: 10,
        title: "Témoignage : 30 Jours de Bain Glacé Quotidien, Mon Transformation",
        excerpt: "Journal détaillé d'une transformation physique et mentale grâce au protocole du froid.",
        category: "temoignages",
        date: "25 Décembre 2023",
        readTime: "10 min",
        image: "images site/images/3441955843091463047.jpg"
    },
    {
        id: 11,
        title: "Le Timing Parfait : Quand Prendre votre Bain Glacé pour Maximiser les Bénéfices",
        excerpt: "Matin ou soir ? Avant ou après l'entraînement ? Science et conseils pratiques.",
        category: "science",
        date: "22 Décembre 2023",
        readTime: "7 min",
        image: "images site/images/bain-glace-non-ice.jpg"
    },
    {
        id: 12,
        title: "Booster votre Système Immunitaire : Le Protocole Froid + Nutrition",
        excerpt: "Combinez bain glacé et alimentation stratégique pour une immunité d'acier.",
        category: "nutrition",
        date: "20 Décembre 2023",
        readTime: "6 min",
        image: "images site/images/2274780807368754044.jpg"
    }
];

// DOM Elements
let currentArticleIndex = 6; // Already showing 6 articles
let filteredCategory = 'all';
let searchQuery = '';

// Initialize blog on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeBlog();
    setupEventListeners();
    setupScrollAnimations();
});

// Initialize blog
function initializeBlog() {
    // Setup category filters
    setupCategoryFilters();

    // Setup search
    setupSearch();

    // Setup load more
    setupLoadMore();

    // Setup newsletter
    setupNewsletter();

    // Add smooth scrolling
    addSmoothScrolling();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navCenter = document.querySelector('.nav-center');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navCenter.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle?.classList.remove('active');
            navCenter?.classList.remove('active');
        });
    });
}

// Setup category filters
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter articles
            filteredCategory = btn.dataset.category;
            filterArticles();
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterArticles();
        });

        // Add search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterArticles();
            }
        });
    }
}

// Filter articles
function filterArticles() {
    const articles = document.querySelectorAll('.blog-card');
    let visibleCount = 0;

    articles.forEach(article => {
        const category = article.dataset.category;
        const title = article.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
        const excerpt = article.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';

        const matchesCategory = filteredCategory === 'all' || category === filteredCategory;
        const matchesSearch = !searchQuery ||
            title.includes(searchQuery) ||
            excerpt.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
            article.style.display = 'block';
            visibleCount++;
            // Add animation
            article.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            article.style.display = 'none';
        }
    });

    // Show/hide load more button based on results
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        if (visibleCount === 0) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    }
}

// Show no results message
function showNoResultsMessage() {
    const blogGrid = document.getElementById('blog-grid');
    const existingMessage = document.querySelector('.no-results-message');

    if (!existingMessage && blogGrid) {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>Aucun article trouvé</h3>
            <p>Essayez avec d'autres mots-clés ou catégories</p>
        `;
        blogGrid.parentNode.insertBefore(message, blogGrid.nextSibling);
    }
}

// Hide no results message
function hideNoResultsMessage() {
    const message = document.querySelector('.no-results-message');
    if (message) {
        message.remove();
    }
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreArticles();
        });
    }
}

// Load more articles
function loadMoreArticles() {
    const blogGrid = document.getElementById('blog-grid');
    const loadMoreBtn = document.getElementById('load-more');

    if (!blogGrid || !loadMoreBtn) return;

    // Calculate how many articles to load
    const articlesToLoad = Math.min(3, blogArticles.length - currentArticleIndex);

    if (articlesToLoad <= 0) {
        loadMoreBtn.innerHTML = 'Tous les articles sont chargés <i class="fas fa-check"></i>';
        loadMoreBtn.disabled = true;
        return;
    }

    // Load articles
    for (let i = 0; i < articlesToLoad; i++) {
        const article = blogArticles[currentArticleIndex + i];
        const articleCard = createArticleCard(article);
        blogGrid.appendChild(articleCard);
    }

    currentArticleIndex += articlesToLoad;

    // Update button text
    if (currentArticleIndex >= blogArticles.length) {
        loadMoreBtn.innerHTML = 'Tous les articles sont chargés <i class="fas fa-check"></i>';
        loadMoreBtn.disabled = true;
    }

    // Apply filter to new articles
    filterArticles();
}

// Create article card HTML
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'blog-card fade-in';
    card.dataset.category = article.category;

    card.innerHTML = `
        <div class="blog-card-image">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
            <span class="article-category-badge">${getCategoryLabel(article.category)}</span>
        </div>
        <div class="blog-card-content">
            <div class="article-meta">
                <span class="article-date">${article.date}</span>
                <span class="article-read-time">${article.readTime}</span>
            </div>
            <h3 class="blog-card-title">${article.title}</h3>
            <p class="blog-card-excerpt">${article.excerpt}</p>
            <a href="articles/article-${article.id}.html" class="blog-card-link">Lire la suite →</a>
        </div>
    `;

    return card;
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'bienfaits': 'Bienfaits',
        'guide': 'Guide',
        'science': 'Science',
        'temoignages': 'Témoignage',
        'nutrition': 'Nutrition'
    };
    return labels[category] || category;
}

// Setup newsletter
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput?.value;

            if (email && validateEmail(email)) {
                // Show success message
                showNewsletterSuccess();
                emailInput.value = '';
            } else {
                showNewsletterError();
            }
        });
    }
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show newsletter success
function showNewsletterSuccess() {
    const form = document.querySelector('.newsletter-form');
    const message = document.createElement('div');
    message.className = 'newsletter-message success';
    message.innerHTML = '<i class="fas fa-check-circle"></i> Inscription réussie ! Vérifiez votre email.';

    form.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

// Show newsletter error
function showNewsletterError() {
    const form = document.querySelector('.newsletter-form');
    const message = document.createElement('div');
    message.className = 'newsletter-message error';
    message.innerHTML = '<i class="fas fa-exclamation-circle"></i> Email invalide. Veuillez réessayer.';

    form.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

// Add smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.blog-card, .featured-card').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }

    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .no-results-message {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;
    }

    .no-results-message i {
        font-size: 3rem;
        color: #dee2e6;
        margin-bottom: 20px;
    }

    .no-results-message h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: var(--dark-color);
    }

    .newsletter-message {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .newsletter-message.success {
        background: #28a745;
        color: white;
    }

    .newsletter-message.error {
        background: #dc3545;
        color: white;
    }
`;
document.head.appendChild(style);