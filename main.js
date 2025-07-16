// Simulate real-time AI updates
function updateAIMetrics() {
    const confidenceBars = document.querySelectorAll('.confidence-fill');
    confidenceBars.forEach((bar) => {
        const currentWidth = parseInt(bar.style.width);
        const variation = Math.random() * 6 - 3; // ±3% variation
        const newWidth = Math.max(50, Math.min(99, currentWidth + variation));
        bar.style.width = `${newWidth}%`;
    });
}

function animateAIPredictions() {
    const predictions = document.querySelectorAll('.ai-prediction');
    predictions.forEach((pred, index) => {
        setTimeout(() => {
            pred.style.transform = 'scale(1.02)';
            pred.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
            setTimeout(() => {
                pred.style.transform = 'scale(1)';
                pred.style.boxShadow = 'none';
            }, 200);
        }, index * 500);
    });
}

setInterval(updateAIMetrics, 3000);
setInterval(animateAIPredictions, 5000);

document.querySelectorAll('.ai-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.1)';
        badge.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
    });
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1)';
        badge.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.8)';
    });
});

let currentLanguage = 'zh';

function switchLanguage(lang) {
    currentLanguage = lang;

    // Hide all content
    document.querySelectorAll('.lang-content').forEach(element => {
        element.classList.remove('active');
    });

    // Show content for selected language
    document.querySelectorAll(`.lang-content[data-lang="${lang}"]`).forEach(element => {
        element.classList.add('active');
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Defensive: check if button exists before adding class
    const langBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
    if (langBtn) {
        langBtn.classList.add('active');
    }

    // Update document language attribute
    document.documentElement.lang = lang;
}

// The main issue: The event listeners for the language buttons are being attached
// before the DOM is fully loaded, so if this script is in the <head> or before the buttons exist,
// the querySelectorAll('.lang-btn') will return an empty NodeList and no listeners will be attached.
// Solution: Move all event listener attachment and initialization into DOMContentLoaded.

document.addEventListener('DOMContentLoaded', function() {
    // Attach language button event listeners
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Attach mobile menu link close listeners
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Initialize with English
    switchLanguage('zh');
});

// Mobile menu functions remain global for inline onclick handlers
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');

    menu.classList.toggle('active');
    overlay.classList.toggle('active');

    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');

    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});