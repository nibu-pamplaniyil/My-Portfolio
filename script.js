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

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('[data-toggle="tab"], .tab-button');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('.skills-grid.tab-pane.active .skill-card').forEach(card => {
          card.style.animation = 'none';
          void card.offsetWidth; // Force reflow
          card.style.animation = '';
        });
      }, 100);
    });
  });
});
const tabs = document.querySelectorAll('.tab-button'); // your tab buttons
const panes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-target'); // e.g., "frontend"
    const targetPane = document.getElementById(targetId);

    const currentPane = document.querySelector('.tab-pane.active');

    if (currentPane === targetPane) return;

    // Determine direction
    const tabIndex = Array.from(tabs).indexOf(tab);
    const currentIndex = Array.from(panes).indexOf(currentPane);
    const direction = tabIndex > currentIndex ? 'left' : 'right';

    // Slide out current pane
    currentPane.classList.remove('active');
    currentPane.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');

    // Prepare target pane offscreen
    targetPane.classList.remove('slide-out-left','slide-out-right','slide-in-left','slide-in-right');
    targetPane.classList.add(direction === 'left' ? 'slide-in-right' : 'slide-in-left');

    // Force reflow for transition to work
    void targetPane.offsetWidth;

    // Activate target pane
    targetPane.classList.add('active');

    // Cleanup old pane after animation
    setTimeout(() => {
      currentPane.classList.remove('slide-out-left','slide-out-right');
      targetPane.classList.remove('slide-in-left','slide-in-right');
    }, 600); // matches CSS transition duration
  });
});

 const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  // Function to remove active class from all links
  function removeActive() {
    navLinks.forEach(link => link.classList.remove("text-indigo-600", "font-bold"));
  }

  // Function to add active class based on scroll
  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // adjust offset for navbar height
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    removeActive();

    navLinks.forEach(link => {
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("text-indigo-600", "font-bold"); // active styles
      }
    });
  });

  // Optional: Add click effect for smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      const offset = 160; // height of navbar + some padding
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = target.getBoundingClientRect().top;
        const targetPosition = targetRect - bodyRect - offset;
        
        window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
        });

    });
  });
