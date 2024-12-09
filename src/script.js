playSound('assets/mixkit-tick-tock-clock-close-up-1059.wav', true);

const countdownModel = countdown.init(document.getElementById('countdown'));
countdownModel.start(1200);
countdownModel.addEventListener('completed', showGuessError);

const pincodeModel = pincode.init(
    document.getElementById('pincode'),
    '1234');
pincodeModel.addEventListener('pincode-guessed-correctly', () => {
    showGuessSuccess();
    countdownModel.stop();
})
pincodeModel.addEventListener('pincode-guessed-incorrectly', () => {
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