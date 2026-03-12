document.addEventListener('DOMContentLoaded', () => {
    const updatesPerSecond = 20;
    const animalsKilledPerYear = {
        "wild-caught-fish": 970000000000,
        "chickens": 61171973510,
        "farmed-fish": 38000000000,
        "ducks": 2887594480,
        "pigs": 1451856889.38,
        "rabbits": 1171578000,
        "geese": 687147000,
        "turkeys": 618086890,
        "sheep": 536742256.33,
        "goats": 438320370.99,
        "cattle": 298799160.08,
        "rodents": 70371000,
        "other-birds": 59656000,
        "buffaloes": 25798819,
        "horses": 4863367,
        "donkeys": 3213400,
        "camelids": 3243266.03,
    };

    const secondsPerYear = 365 * 24 * 60 * 60;
    const interval = 1000 / updatesPerSecond;
    let count = 0;
    const start = new Date().getTime();

    function updateCounters(intervalCount) {
        for (const animal in animalsKilledPerYear) {
            const numKilled = animalsKilledPerYear[animal];
            const countElement = document.getElementById(`akc-${animal}`);
            if (countElement) {
                const totalKilled = Math.round(intervalCount * (numKilled / secondsPerYear) / updatesPerSecond);
                countElement.innerText = totalKilled.toLocaleString();
            }
        }
    }

    function selfCorrectingTimeout() {
        count++;
        updateCounters(count);
        const expectedTime = count * interval;
        const actualTime = new Date().getTime() - start;
        const drift = actualTime - expectedTime;
        setTimeout(selfCorrectingTimeout, Math.max(0, interval - drift));
    }

    setTimeout(selfCorrectingTimeout, interval);

    // Page Timer
    const timerElement = document.getElementById('slaughter-time');
    if (timerElement) {
        setInterval(() => {
            const elapsedMs = new Date().getTime() - start;
            const totalSeconds = elapsedMs / 1000;
            
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            let timeString = '';
            if (hours > 0) timeString += `${hours}hr `;
            if (minutes > 0 || hours > 0) timeString += `${minutes}m `;
            timeString += `${seconds.toFixed(1)}s`;

            timerElement.innerText = timeString;
        }, 50);
    }
});
