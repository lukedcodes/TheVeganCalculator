// Wait for components to be loaded
document.addEventListener('componentsLoaded', () => {

    // DOM ELEMENTS - MENU
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('full-screen-menu');

    // --- MENU LOGIC ---
    if (menuOpenBtn && menuCloseBtn && menuOverlay) {
        menuOpenBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('hidden');
        });

        menuCloseBtn.addEventListener('click', () => {
            menuOverlay.classList.add('hidden');
        });

        // Close menu when any link is clicked (useful for anchors)
        const menuLinks = menuOverlay.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.add('hidden');
            });
        });

        // --- UNIT TOGGLE LOGIC ---
        const toggleImperial = document.getElementById('toggle-imperial');
        const toggleMetric = document.getElementById('toggle-metric');

        if (toggleImperial && toggleMetric && window.veganCalculator) {
            // Sync initial state
            if (window.veganCalculator.isMetric) {
                toggleMetric.classList.add('active');
                toggleImperial.classList.remove('active');
            } else {
                toggleImperial.classList.add('active');
                toggleMetric.classList.remove('active');
            }

            toggleImperial.addEventListener('click', () => {
                window.veganCalculator.isMetric = false;
                toggleImperial.classList.add('active');
                toggleMetric.classList.remove('active');
                if (window.veganCalculator.updateLabelsAndStats) {
                    window.veganCalculator.updateLabelsAndStats();
                }
            });

            toggleMetric.addEventListener('click', () => {
                window.veganCalculator.isMetric = true;
                toggleMetric.classList.add('active');
                toggleImperial.classList.remove('active');
                if (window.veganCalculator.updateLabelsAndStats) {
                    window.veganCalculator.updateLabelsAndStats();
                }
            });
        }
    }

    // Set Copyright Year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.innerText = new Date().getFullYear();
    }

});

