// SEO Optimization Module

// Structured Data for Organization
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Glacier Store",
    "alternateName": "Glacialis by Glacier",
    "url": "https://glacierstore.fr",
    "logo": "https://glacierstore.fr/images%20site/images/logo_glacier3.png",
    "description": "Spécialiste des bains glacés premium pour thérapie par le froid et récupération sportive",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
    },
    "sameAs": [
        "https://www.facebook.com/glacierstore",
        "https://www.instagram.com/glacierstore",
        "https://twitter.com/glacierstore"
    ],
    "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "4990",
        "highPrice": "5990",
        "offerCount": "2",
        "offers": [
            {
                "@type": "Offer",
                "name": "Version NON-ICE (3°C+)",
                "price": "4990",
                "priceCurrency": "EUR"
            },
            {
                "@type": "Offer",
                "name": "Version ICE (0°C)",
                "price": "5990",
                "priceCurrency": "EUR"
            }
        ]
    }
};

// Product Schema
const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Bain Glacé Premium Glacialis",
    "image": [
        "https://glacierstore.fr/images%20site/images/3441955843091463047.jpg",
        "https://glacierstore.fr/images%20site/images/14.jpg",
        "https://glacierstore.fr/images%20site/images/bain-glace-ice.jpg"
    ],
    "description": "Bain glacé premium avec technologie de refroidissement avancée. Disponible en version ICE (0°C) ou NON-ICE (3°C+). Construction en acier inoxydable 316SS, garantie 2 ans.",
    "brand": {
        "@type": "Brand",
        "name": "Glacier Store"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Glacier Store"
    },
    "model": "Glacialis Premium",
    "offers": {
        "@type": "AggregateOffer",
        "url": "https://glacierstore.fr/produit.html",
        "priceCurrency": "EUR",
        "lowPrice": "4990",
        "highPrice": "5990",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": 7,
            "maxValue": 14,
            "unitCode": "DAY"
        },
        "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "EUR"
            },
            "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "WORLDWIDE"
            },
            "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                },
                "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 7,
                    "maxValue": 14,
                    "unitCode": "DAY"
                }
            }
        }
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Thomas L."
            },
            "datePublished": "2024-01-15",
            "reviewBody": "Qualité exceptionnelle! Le système de refroidissement est très efficace et silencieux."
        }
    ]
};

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Quelle est la différence entre la version ICE et NON-ICE ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "La version ICE maintient une température de 0°C pour une thérapie par le froid extrême, idéale pour les athlètes professionnels. La version NON-ICE maintient 3°C minimum, parfaite pour une utilisation régulière et le bien-être quotidien."
            }
        },
        {
            "@type": "Question",
            "name": "Combien de temps dure une séance de bain glacé ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Une séance typique dure entre 3 et 15 minutes. Nous recommandons de commencer par 3-5 minutes et d'augmenter progressivement selon votre tolérance."
            }
        },
        {
            "@type": "Question",
            "name": "Le bain glacé nécessite-t-il un entretien particulier ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Notre système de filtration UV et ozone maintient l'eau propre automatiquement. Un simple changement d'eau tous les 3-6 mois et un nettoyage léger suffisent."
            }
        },
        {
            "@type": "Question",
            "name": "Quelle est la garantie du produit ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tous nos bains glacés bénéficient d'une garantie complète de 2 ans couvrant les pièces et la main-d'œuvre. La construction en acier inoxydable 316SS garantit une durabilité exceptionnelle."
            }
        }
    ]
};

// Breadcrumb Schema
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://glacierstore.fr"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Produit",
            "item": "https://glacierstore.fr/produit.html"
        }
    ]
};

// Function to inject structured data
function injectStructuredData() {
    const schemas = [organizationSchema, productSchema, faqSchema, breadcrumbSchema];

    schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    });
}

// Function to optimize meta tags
function optimizeMetaTags() {
    // Open Graph tags
    const ogTags = [
        { property: 'og:title', content: 'Glacier Store - Bains Glacés Premium | Thérapie par le Froid' },
        { property: 'og:description', content: 'Découvrez nos bains glacés premium pour une récupération optimale. Version ICE (0°C) ou NON-ICE (3°C+). Livraison mondiale gratuite.' },
        { property: 'og:image', content: 'https://glacierstore.fr/images%20site/images/3441955843091463047.jpg' },
        { property: 'og:url', content: 'https://glacierstore.fr' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' }
    ];

    // Twitter Card tags
    const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Glacier Store - Bains Glacés Premium' },
        { name: 'twitter:description', content: 'Bains glacés premium ICE (0°C) ou NON-ICE (3°C+). Construction 316SS, garantie 2 ans.' },
        { name: 'twitter:image', content: 'https://glacierstore.fr/images%20site/images/3441955843091463047.jpg' }
    ];

    // Additional SEO meta tags
    const seoTags = [
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'author', content: 'Glacier Store' },
        { name: 'keywords', content: 'bain glacé, thérapie par le froid, récupération sportive, cryothérapie, bain froid, ice bath, cold plunge, wellness, performance sportive' },
        { name: 'theme-color', content: '#0066CC' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
    ];

    // Inject Open Graph tags
    ogTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
    });

    // Inject Twitter tags
    twitterTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
    });

    // Inject SEO tags
    seoTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { rel: 'preload', href: '/styles-new.css', as: 'style' },
        { rel: 'preload', href: '/mobile-optimization.css', as: 'style' },
        { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', as: 'style' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = resource.rel;
        link.href = resource.href;
        if (resource.as) link.as = resource.as;
        if (resource.crossorigin) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Initialize SEO optimizations on page load
document.addEventListener('DOMContentLoaded', () => {
    injectStructuredData();
    optimizeMetaTags();
    preloadCriticalResources();
});