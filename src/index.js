"use-strict"
const countDownEl = document.getElementById("countdown");
const babyAnimationEl = document.getElementById('babyAnimation');
const babyIsHereAnimationEl = document.getElementById('babyIsHereAnimation');
const loadingEl = document.getElementById('loading');
const novaEl = document.getElementById('nova');

// Set the date we're counting down to
const countDownDate = new Date("November 13, 2023 00:00:00").getTime();
let babyAnimation;

let loadingAnimation = bodymovin.loadAnimation({
    container: loadingEl,
    path: './src/assets/loading.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
});

const showBabyIsHereAnimation = () => {
    bodymovin.loadAnimation({
        container: babyIsHereAnimationEl,
        path: './src/assets/baby-is-here-animation.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
    });
};

// Update the countdown every second
const countdown = () => {
    return new Promise((res, rej) => {
        const countdownInterval = setInterval(function () {

            // Get the current date and time
            const now = new Date().getTime();

            // Calculate the time remaining
            const timeRemaining = countDownDate - now;

            // Calculate days, hours, minutes and seconds
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countDownEl.textContent = `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`;

            res(true);

            // Output the countdown
            console.log("Countdown: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds");

            // Check if the countdown has reached the end date
            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                countDownEl.remove()

                if (babyAnimation != null) {
                    babyAnimation.destroy()
                    babyAnimation = null;
                    babyAnimationEl.remove()
                }

                showBabyIsHereAnimation();
                babyIsHereAnimationEl.classList.remove('hide');

                console.log("Countdown finished!");
            }
        }, 1000);
    })
}


countdown().then(() => {
    loadingAnimation.destroy();
    loadingAnimation = null;
    loadingEl.remove()

    babyAnimationEl.classList.remove('hide');
    babyAnimation = bodymovin.loadAnimation({
        container: babyAnimationEl,
        path: './src/assets/baby-animation.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
    });

    novaEl.textContent = "Until Nova Pedersen Eggert is here!";
})

