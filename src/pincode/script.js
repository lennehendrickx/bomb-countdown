const pincode = (function () {
    class PincodeModel extends EventTarget {
        #pincode

        constructor(pincode) {
            super();
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

    class PincodeView {

        #parent;

        constructor(parent, model) {
            this.#parent = parent;
            this.#parent.classList.add('pin-code');
            this.#parent.innerHTML = `<input type="number" autofocus>
                                <input type="number">
                                <input type="number">
                                <input type="number">
                                <button>Check</button>`;

            this.#parent.addEventListener('keyup', ({srcElement: target}) => {
                if (target.value.length >= 1) {
                    let next = target.nextElementSibling;
                    while (next != null) {
                        if (next.tagName === "INPUT") {
                            next.focus();
                            break;
                        }
                        next = next.nextElementSibling;
                    }
                } else if (target.value.length === 0) {
                    let previous = target.previousElementSibling;
                    while (previous != null) {
                        if (previous.tagName === "INPUT") {
                            previous.focus();
                            break;
                        }
                        previous = previous.previousElementSibling;
                    }
                }
            }, false);
            this.#parent.addEventListener('keydown', ({srcElement: target}) => {
                target.value = "";
            }, false);
            this.#parent.addEventListener('click', ({srcElement: target}) => {
                if (target.tagName === 'BUTTON') {
                    const pincode = [...this.#parent.children]
                        .filter(child => child.tagName === 'INPUT')
                        .map(input => input.value)
                        .reduce((a, b) => a + b, '');
                    model.guess(pincode);
                }
            });

        }
    }

    return {
        init(parent, pincode) {
            const model = new PincodeModel(pincode);
            new PincodeView(parent, model);
            return model;
        }
    };

})()


