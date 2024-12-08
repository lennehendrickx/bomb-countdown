const pincode = (function() {
    class PincodeView extends EventTarget {

       #container;

        constructor() {
            super();
            this.#container = document.querySelector(".pin-code");
            this.#container.addEventListener('keyup', ({srcElement: target}) => {
                var myLength = target.value.length;

                if (myLength >= 1) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                        if (next == null) break;
                        if (next.tagName == "INPUT") {
                            next.focus();
                            break;
                        }
                    }
                }

                if (myLength === 0) {
                    var next = target;
                    while (next = next.previousElementSibling) {
                        if (next == null) break;
                        if (next.tagName == "INPUT") {
                            next.focus();
                            break;
                        }
                    }
                }
            }, false);
            this.#container.addEventListener('keydown', ({srcElement: target}) => {
                target.value = "";
            }, false);
            this.#container.addEventListener('click', ({srcElement: target}) => {
                if (target.tagName === 'BUTTON') {
                    const pincode = [...this.#container.children]
                    .filter(child => child.tagName === 'INPUT')
                    .map(input => input.value)
                    .reduce((a, b) => a + b, '');
                    this.dispatchEvent(new CustomEvent('guess-clicked', { detail: { pincode }}));
                }
            })
        }
    }

    class PincodeModel extends EventTarget {
        #pincode

        setup(pincode) {
            this.#pincode = pincode;
        }

        guess(pincode) {
            if (pincode === this.#pincode) {
                this.dispatchEvent(new Event('pincode-guessed-correctly'))
            } else {
                this.dispatchEvent(new Event('pincode-guessed-incorrectly'))
            }
        }
    }

    const view = new PincodeView();
    view.addEventListener('guess-clicked', ({detail: {pincode}}) => {
        model.guess(pincode);
    });
    const model = new PincodeModel({});
    return model;

})()


