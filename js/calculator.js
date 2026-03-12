document.addEventListener('DOMContentLoaded', () => {

    // STATE
    let years = 0;
    let months = 0;
    let isCalculated = false;

    // --- REGION DETECTION FOR METRIC/IMPERIAL ---
    const userLocale = navigator.language || navigator.userLanguage || "en-US";
    window.veganCalculator = {
        isMetric: !userLocale.includes('US') && !userLocale.includes('LR') && !userLocale.includes('MM')
    };

    // DOM ELEMENTS - CALCULATOR
    const valYears = document.getElementById('val-years');
    const valMonths = document.getElementById('val-months');
    const incYearsBtn = document.getElementById('inc-years');
    const decYearsBtn = document.getElementById('dec-years');
    const incMonthsBtn = document.getElementById('inc-months');
    const decMonthsBtn = document.getElementById('dec-months');
    const calculateBtn = document.getElementById('btn-calculate');
    const calcHeadline = document.getElementById('calc-headline');

    // DOM ELEMENTS - RESULTS
    const statsContainer = document.getElementById('stats-container');
    const statAnimals = document.getElementById('stat-animals');
    const statWater = document.getElementById('stat-water');
    const statGrain = document.getElementById('stat-grain');
    const statCo2 = document.getElementById('stat-co2');
    const statForest = document.getElementById('stat-forest');

    const labelWater = document.getElementById('label-water');
    const labelGrain = document.getElementById('label-grain');
    const labelCo2 = document.getElementById('label-co2');
    const labelForest = document.getElementById('label-forest');

    // Unit toggle logic moved to main.js to handle component loading


    function updateDOM() {
        if (!valYears || !valMonths) return;
        valYears.value = years;
        valMonths.value = months;
    }

    if (valYears && valMonths && calculateBtn) {
        valYears.addEventListener('input', (e) => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) val = 0;
            if (val > 999) {
                val = 999;
                e.target.value = 999;
            }
            years = Math.max(0, val);
        });
        valYears.addEventListener('focus', (e) => {
            if (e.target.value === '0') e.target.value = '';
        });
        valYears.addEventListener('blur', (e) => {
            if (e.target.value === '') {
                e.target.value = '0';
                years = 0;
            }
        });

        valMonths.addEventListener('input', (e) => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) val = 0;
            if (val > 11) {
                val = 11;
                e.target.value = 11;
            }
            months = Math.max(0, val);
        });
        valMonths.addEventListener('focus', (e) => {
            if (e.target.value === '0') e.target.value = '';
        });
        valMonths.addEventListener('blur', (e) => {
            if (e.target.value === '') {
                e.target.value = '0';
                months = 0;
            }
        });

        incYearsBtn.addEventListener('click', () => {
            if (years < 999) years++;
            updateDOM();
        });
        decYearsBtn.addEventListener('click', () => { years = Math.max(0, years - 1); updateDOM(); });

        incMonthsBtn.addEventListener('click', () => {
            if (months === 11 && years >= 999) return;
            months++;
            if (months > 11) {
                years++;
                months = 0;
            }
            updateDOM();
        });

        decMonthsBtn.addEventListener('click', () => {
            months--;
            if (months < 0) {
                if (years > 0) {
                    years--;
                    months = 11;
                } else {
                    months = 0;
                }
            }
            updateDOM();
        });

        calculateBtn.addEventListener('click', () => {
            statsContainer.classList.add('loading');
            setTimeout(() => {
                statsContainer.classList.remove('loading');
                if (years === 0 && months === 0) {
                    isCalculated = false;
                    statsContainer.classList.add('uncalculated');
                } else {
                    isCalculated = true;
                    statsContainer.classList.remove('uncalculated');
                }
                updateLabelsAndStats();
            }, 250);
        });
    }

    function updateLabelsAndStats() {
        const isMetric = window.veganCalculator.isMetric;
        if (labelWater) labelWater.textContent = isMetric ? "Liters of Water" : "Gallons of Water";
        if (labelGrain) labelGrain.textContent = isMetric ? "Kg of Grain" : "Lbs of Grain";
        if (labelCo2) labelCo2.textContent = isMetric ? "Kg of Co2" : "lbs of Co2";
        if (labelForest) labelForest.textContent = isMetric ? "Sq M Forest" : "Sq Ft Forest";

        if (calcHeadline) {
            if (isCalculated) {
                const monthText = months > 0 ? ` and ${months} months ` : ' ';
                calcHeadline.innerHTML = `In ${years} years${monthText}of being vegan, you've saved:`;
            } else {
                calcHeadline.innerHTML = `Every day as a vegan you save:`;
            }
        }

        const totalDays = isCalculated ? ((years * 365) + (months * 30)) : 1;

        let animals = totalDays * 1;
        let water = totalDays * 1100;
        let grain = totalDays * 40;
        let co2 = totalDays * 20;
        let forest = totalDays * 30;

        if (window.veganCalculator.isMetric) {
            water *= 3.78541; // Gallons to Liters
            grain *= 0.453592; // Lbs to Kg
            co2 *= 0.453592; // Lbs to Kg
            forest *= 0.092903; // Sq Ft to Sq M
        }

        if (statAnimals) statAnimals.textContent = Math.floor(animals).toLocaleString();
        if (statWater) statWater.textContent = Math.floor(water).toLocaleString();
        if (statGrain) statGrain.textContent = Math.floor(grain).toLocaleString();
        if (statCo2) statCo2.textContent = Math.floor(co2).toLocaleString();
        if (statForest) statForest.textContent = Math.floor(forest).toLocaleString();
    }

    // Initial Sync
    updateDOM();
    updateLabelsAndStats();

    // Expose for main.js
    window.veganCalculator.updateLabelsAndStats = updateLabelsAndStats;
});
