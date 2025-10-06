/* ============================================
   GLACIER STORE - JavaScript Interactions
   Modern cold therapy website
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================
       1. HEADER SCROLL EFFECTS
       ============================================ */

    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background on scroll
        if (currentScroll > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.05)';
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    /* ============================================
       2. MOBILE MENU TOGGLE
       ============================================ */

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navCenter = document.querySelector('.nav-center');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navCenter.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
    }

    /* ============================================
       3. PRODUCT IMAGE GALLERY
       ============================================ */

    window.changeImage = function(thumbnail) {
        const mainImage = document.getElementById('mainImage');
        if (mainImage && thumbnail) {
            // Update main image
            mainImage.src = thumbnail.src;

            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => {
                t.classList.remove('active');
            });
            thumbnail.classList.add('active');

            // Add fade animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        }
    }

    /* ============================================
       4. TABS FUNCTIONALITY
       ============================================ */

    window.showTab = function(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Remove active from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Add active to clicked button
        event.target.classList.add('active');
    }

    /* ============================================
       5. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================
       6. FORM VALIDATION
       ============================================ */

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);

            // Basic validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });

            if (isValid) {
                // Show success message (in real app, send to server)
                alert('Merci pour votre demande ! Nous vous contacterons dans les plus brefs délais.');
                this.reset();
            }
        });
    }

    /* ============================================
       7. INTERSECTION OBSERVER FOR ANIMATIONS
       ============================================ */

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.benefit-card, .testimonial-card, .product-card').forEach(el => {
        observer.observe(el);
    });

    /* ============================================
       8. COUNTER ANIMATION
       ============================================ */

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Trigger counter animation when visible
    const counters = document.querySelectorAll('.trust-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* ============================================
       9. CHAT WIDGET
       ============================================ */

    const chatButton = document.querySelector('.chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            // In real app, open chat widget
            alert('Chat en ligne bientôt disponible ! Appelez-nous au +33 1 23 45 67 89');
        });
    }

    /* ============================================
       10. LAZY LOADING IMAGES
       ============================================ */

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /* ============================================
       11. PARALLAX EFFECT
       ============================================ */

    const parallaxElements = document.querySelectorAll('.hero-image');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    /* ============================================
       12. PRICE CALCULATOR (OPTIONAL)
       ============================================ */

    window.calculatePrice = function(quantity = 1) {
        const basePrice = 4999;
        const discount = quantity > 1 ? 0.1 : 0; // 10% discount for multiple units
        const finalPrice = basePrice * quantity * (1 - discount);
        return finalPrice;
    }

    /* ============================================
       13. TESTIMONIAL SLIDER (OPTIONAL)
       ============================================ */

    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (window.innerWidth < 768) {
                testimonial.style.display = i === index ? 'block' : 'none';
            } else {
                testimonial.style.display = 'block';
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Auto-advance testimonials on mobile
    if (window.innerWidth < 768 && testimonials.length > 0) {
        setInterval(nextTestimonial, 5000);
    }

    /* ============================================
       14. PERFORMANCE MONITORING
       ============================================ */

    // Log performance metrics
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });

    /* ============================================
       15. ACCESSIBILITY IMPROVEMENTS
       ============================================ */

    // Add keyboard navigation for tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent-ice);
        color: white;
        padding: 8px;
        z-index: 100;
        text-decoration: none;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    /* ============================================
       16. COOKIE CONSENT (GDPR)
       ============================================ */

    function checkCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                // In production, show proper cookie banner
                if (confirm('Ce site utilise des cookies pour améliorer votre expérience. Acceptez-vous ?')) {
                    localStorage.setItem('cookieConsent', 'accepted');
                }
            }, 2000);
        }
    }

    checkCookieConsent();

    /* ============================================
       17. MOBILE EXCLUSIVE OFFERS VERTICAL LAYOUT
       ============================================ */

    // Fonction pour forcer l'affichage vertical des offres exclusives sur mobile
    function forceMobileVerticalOffers() {
        if (window.innerWidth <= 768) {
            const exclusiveSection = document.querySelector('.exclusive-offer-section');
            if (exclusiveSection) {
                // Cibler le conteneur avec style inline grid
                const gridContainer = exclusiveSection.querySelector('div[style*="grid"]');
                if (gridContainer) {
                    // Remplacer complètement le style inline
                    gridContainer.style.cssText = 'display: flex !important; flex-direction: column !important; gap: 25px !important; max-width: 400px !important; margin: 0 auto !important;';
                    console.log('✅ Affichage vertical forcé pour les offres exclusives');
                }
            }
        }
    }

    // Appliquer immédiatement
    forceMobileVerticalOffers();

    // Réappliquer lors du redimensionnement de la fenêtre
    window.addEventListener('resize', debounce(forceMobileVerticalOffers, 250));

    // Observer les changements DOM pour réappliquer si nécessaire
    if ('MutationObserver' in window) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    forceMobileVerticalOffers();
                }
            });
        });

        // Observer les changements de style sur la section
        const exclusiveSection = document.querySelector('.exclusive-offer-section');
        if (exclusiveSection) {
            observer.observe(exclusiveSection, {
                attributes: true,
                subtree: true,
                attributeFilter: ['style']
            });
        }
    }

    /* ============================================
       18. NEWSLETTER SUBSCRIPTION
       ============================================ */

    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                // In production, send to server
                alert('Merci pour votre inscription à notre newsletter !');
                form.reset();
            }
        });
    });

});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Format price with currency
function formatPrice(price, currency = '€') {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Get cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // In production, integrate with Google Analytics or similar
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Export for use in other scripts if needed
window.GlacierStore = {
    debounce,
    throttle,
    formatPrice,
    isInViewport,
    getQueryParam,
    setCookie,
    getCookie,
    trackEvent
};