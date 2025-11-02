document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Function to handle the staggered animation
    const staggerCards = (paneElement) => {
        // First, clear any existing animation classes
        paneElement.querySelectorAll('.skill-card').forEach(card => {
            card.classList.remove('animate');
            card.style.animationDelay = '';
        });

        // Apply the staggered animation
        paneElement.querySelectorAll('.skill-card').forEach((card, index) => {
            // Use the CSS variable defined earlier
            const delay = index * 50; // 50ms per card delay
            card.style.animationDelay = `${delay}ms`;
            card.classList.add('animate');
        });
    };

    // Initialize the first tab's animation
    const initialPane = document.querySelector('.tab-pane.active');
    if (initialPane) {
        staggerCards(initialPane);
    }

    // Tab switching logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);

            // 1. Remove 'active' class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // 2. Add 'active' class to the clicked button and pane
            button.classList.add('active');
            targetPane.classList.add('active');

            // 3. Trigger the staggered animation for the new pane
            staggerCards(targetPane);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Options for the observer:
    // threshold: 0.5 means the item is considered "intersecting" when 50% visible.
    const options = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // APPEAR: When the item enters the viewport (scrolling down or up)
                entry.target.classList.add('in-view');
            } else {
                // DISAPPEAR: When the item leaves the viewport (scrolling up or down)
                entry.target.classList.remove('in-view');
            }
        });
    }, options);

    // Attach the observer to each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});