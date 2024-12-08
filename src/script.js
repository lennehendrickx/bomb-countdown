playSound('assets/mixkit-tick-tock-clock-close-up-1059.wav', true);

countdown.start(1200);
countdown.addEventListener('completed', showGuessError)

pincode.setup('4567');
pincode.addEventListener('pincode-guessed-correctly', () => {
    showGuessSuccess();
    countdown.stop();
})

pincode.addEventListener('pincode-guessed-incorrectly', () => {
    showGuessError();
    setTimeout(hideGuessError, 2000);
})

function playSound(path, loop = false) {
    const audio = new Audio(path);
    audio.loop = loop;
    audio.play();
}

function showGuessError() {
    const body = document.querySelector('body');
    body.classList.add('guess-error');
}

function hideGuessError() {
    const body = document.querySelector('body');
    body.classList.remove('guess-error');
}

function showGuessSuccess() {
    const body = document.querySelector('body');
    body.classList.add('guess-success');
}