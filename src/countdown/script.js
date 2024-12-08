const countdown = (function() {

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
                this.dispatchEvent(new CustomEvent('tick', { detail: { secondsRemaining }}))
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

         render(hours, minutes, seconds) {
                document.getElementById("hour-1").setAttribute("class","num-" + Math.trunc(hours / 10));
                document.getElementById("hour-2").setAttribute("class","num-" + hours % 10);
                document.getElementById("minute-1").setAttribute("class","num-" + Math.trunc(minutes / 10));
                document.getElementById("minute-2").setAttribute("class","num-" + minutes % 10);
                document.getElementById("second-1").setAttribute("class","num-"+ Math.trunc(seconds / 10));
                document.getElementById("second-2").setAttribute("class","num-" + seconds % 10);
            }
    }

    const view = new CountdownView();
    const model = new CountdownModel();
    model.addEventListener('tick', ({ detail: {secondsRemaining}}) => {
               const hours = Math.floor(secondsRemaining / 3600);
               const minutes = Math.floor(secondsRemaining % 3600 / 60);
               const seconds = Math.floor(secondsRemaining % 60);
               view.render(hours, minutes, seconds);
        });
    model.addEventListener('completed', () => {
              console.log('Countdown completed');
        });
    return model;

})();



