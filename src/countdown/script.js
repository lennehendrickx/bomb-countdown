const countdown = (function () {

    class CountdownModel extends EventTarget {
        #state = 'STOPPED';
        #endTime;

        start(duration = 180) {
            if (this.#state !== 'STOPPED') {
                return;
            }

            this.#endTime = CountdownModel.#currentTime() + duration;
            this.#state = 'STARTED';
            this.#countdown();
        }

        stop() {
            if (this.#state !== 'STARTED') {
                return;
            }

            this.#state = 'STOPPED';
        }

        #countdown() {
            if (this.#state !== 'STARTED') {
                return;
            }

            const secondsRemaining = this.#endTime - CountdownModel.#currentTime();

            if (secondsRemaining >= 0) {
                this.dispatchEvent(new CustomEvent('tick', {detail: {secondsRemaining}}))
                setTimeout(() => this.#countdown(), 100);
            } else {
                this.dispatchEvent(new Event('completed'))
                this.#state = 'STOPPED';
            }
        }

        static #currentTime() {
            return Math.trunc(Date.now() / 1000)
        }

    }

    class CountdownView {
        #parent;

        constructor(parent, model) {
            this.#parent = parent;
            this.#parent.classList.add('digital-watch');
            this.#parent.innerHTML = `
                <svg width="0" height="0" viewBox="0 0 0 0">
                    <defs>
                        <g id="unit-h">
                            <path d="M0 20 L20 40 L180 40 L200 20 L180 0 L20 0 Z"></path>
                        </g>
                        <g id="unit-v">
                            <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
                        </g>
                    </defs>
                </svg>
                <div class="hour">
                    <svg class="num-0" width="130" height="240" viewBox="0 0 260 480">
                        <use xlink:href="#unit-h" class="segment a" x="30" y="0"></use>
                        <use xlink:href="#unit-v" class="segment b" x="220" y="30"></use>
                        <use xlink:href="#unit-v" class="segment c" x="220" y="250"></use>
                        <use xlink:href="#unit-h" class="segment d" x="30" y="440"></use>
                        <use xlink:href="#unit-v" class="segment e" x="0" y="250"></use>
                        <use xlink:href="#unit-v" class="segment f" x="0" y="30"></use>
                        <use xlink:href="#unit-h" class="segment g" x="30" y="220"></use>
                    </svg>
                    <svg class="num-0" width="130" height="240" viewBox="0 0 260 480">
                        <use xlink:href="#unit-h" class="segment a" x="30" y="0"></use>
                        <use xlink:href="#unit-v" class="segment b" x="220" y="30"></use>
                        <use xlink:href="#unit-v" class="segment c" x="220" y="250"></use>
                        <use xlink:href="#unit-h" class="segment d" x="30" y="440"></use>
                        <use xlink:href="#unit-v" class="segment e" x="0" y="250"></use>
                        <use xlink:href="#unit-v" class="segment f" x="0" y="30"></use>
                        <use xlink:href="#unit-h" class="segment g" x="30" y="220"></use>
                    </svg>
                </div>
                <div class="minute">
                    <svg class="num-0" width="130" height="240" viewBox="0 0 260 480">
                        <use xlink:href="#unit-h" class="segment a" x="30" y="0"></use>
                        <use xlink:href="#unit-v" class="segment b" x="220" y="30"></use>
                        <use xlink:href="#unit-v" class="segment c" x="220" y="250"></use>
                        <use xlink:href="#unit-h" class="segment d" x="30" y="440"></use>
                        <use xlink:href="#unit-v" class="segment e" x="0" y="250"></use>
                        <use xlink:href="#unit-v" class="segment f" x="0" y="30"></use>
                        <use xlink:href="#unit-h" class="segment g" x="30" y="220"></use>
                    </svg>
                    <svg class="num-0" width="130" height="240" viewBox="0 0 260 480">
                        <use xlink:href="#unit-h" class="segment a" x="30" y="0"></use>
                        <use xlink:href="#unit-v" class="segment b" x="220" y="30"></use>
                        <use xlink:href="#unit-v" class="segment c" x="220" y="250"></use>
                        <use xlink:href="#unit-h" class="segment d" x="30" y="440"></use>
                        <use xlink:href="#unit-v" class="segment e" x="0" y="250"></use>
                        <use xlink:href="#unit-v" class="segment f" x="0" y="30"></use>
                        <use xlink:href="#unit-h" class="segment g" x="30" y="220"></use>
                    </svg>
                </div>
                <div class="second">
                    <svg class="num-0" width="130" height="240" viewBox="0 0 260 480">
                        <use xlink:href="#unit-h" class="segment a" x="30" y="0"></use>
                        <use xlink:href="#unit-v" class="segment b" x="220" y="30"></use>
                        <use xlink:href="#unit-v" class="segment c" x="220" y="250"></use>
                        <use xlink:href="#unit-h" class="segment d" x="30" y="440"></use>
                        <use xlink:href="#unit-v" class="segment e" x="0" y="250"></use>
                        <use xlink:href="#unit-v" class="segment f" x="0" y="30"></use>
                        <use xlink:href="#unit-h" class="segment g" x="30" y="220"></use>
                    </svg>
    
                    <svg class="num-0" width="130" height="240" viewBox="0 0 260 480">
                        <use xlink:href="#unit-h" class="segment a" x="30" y="0"></use>
                        <use xlink:href="#unit-v" class="segment b" x="220" y="30"></use>
                        <use xlink:href="#unit-v" class="segment c" x="220" y="250"></use>
                        <use xlink:href="#unit-h" class="segment d" x="30" y="440"></use>
                        <use xlink:href="#unit-v" class="segment e" x="0" y="250"></use>
                        <use xlink:href="#unit-v" class="segment f" x="0" y="30"></use>
                        <use xlink:href="#unit-h" class="segment g" x="30" y="220"></use>
                    </svg>
                </div>
            </div>`;

            model.addEventListener('tick', ({detail: {secondsRemaining}}) => {
                const hours = Math.floor(secondsRemaining / 3600);
                const minutes = Math.floor(secondsRemaining % 3600 / 60);
                const seconds = Math.floor(secondsRemaining % 60);
                this.render(hours, minutes, seconds);
            });
        }


        render(hours, minutes, seconds) {
            this.#getDigit("hour", 0).setAttribute("class", "num-" + Math.trunc(hours / 10));
            this.#getDigit("hour", 1).setAttribute("class", "num-" + hours % 10);
            this.#getDigit("minute", 0).setAttribute("class", "num-" + Math.trunc(minutes / 10));
            this.#getDigit("minute", 1).setAttribute("class", "num-" + minutes % 10);
            this.#getDigit("second", 0).setAttribute("class", "num-" + Math.trunc(seconds / 10));
            this.#getDigit("second", 1).setAttribute("class", "num-" + seconds % 10);
        }

        #getDigit(name, index) {
            return this.#parent.getElementsByClassName(name)[0].children[index];
        }
    }

    return {
        init(parent) {
            const model = new CountdownModel();
            new CountdownView(parent, model);
            return model;
        }
    };

})();



