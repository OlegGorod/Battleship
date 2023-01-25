window.addEventListener('DOMContentLoaded', () => {

    class Model {
        
        ships = [
            { locations: ['00', '01', '02'], hits: ['', '', ''] },
            { locations: ['20', '21', '22'], hits: ['', '', ''] },
            { locations: ['45', '46', '47'], hits: ['', '', ''] }
        ]
        boardSize = 7;
        numShips = 3;
        shipLength = 3;
        shipsSunk = 0;
        
        
        generateShip() {
            console.log(this.boardSize)
            const direction = Math.floor(Math.random() * 2);
            let row;
            let col;
            if (direction == 1) {               /* Horizontal */
                row = Math.floor(Math.random() * this.boardSize);
                col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            } else {            /* Vertical */
                row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
                col = Math.floor(Math.random() * this.boardSize);
            }
            let newShipLocations = [];

        }

        fire(guess) {
            for (let i = 0; i < this.ships.length; i++) {
                const ship = this.ships[i];
                const location = ship.locations;
                let index = location.indexOf(guess);
                if (index >= 0) {
                    ship.hits[index] = 'hit';
                    view.displayHit(guess);
                    view.displayMessage('HIT');
                    if (this.isSunk(ship)) {
                        view.displayMessage('You sank my ship');
                        this.shipsSunk++;
                    }
                    return true;
                }
            }
            view.displayMessage('You missed');
            view.displayMiss(guess)
            return false
        };

        isSunk(ship) {
            for (let i = 0; i < this.shipLength; i++) {
                if (ship.hits !== 'hit') {
                    return false
                }
                return true
            }
        }

    }


    class Controller {
        constructor(guess) {
            this.guess = guess;
        }
        shots = 0;

        processGuess(guess) {
            let location = parseGuess(guess);
            if (location) {
                this.shots++;
                let hit = play.fire(location);
                if (hit && this.shipsSunk === this.numShips) {
                    view.displayMessage(`You sank all Battleships in ${this.shots} shots.`)
                }
            }
        }
    }

    class View extends Model {
        displayHit(location) {
            const cell = document.getElementById(location);
            cell.classList.add('hit');
        }

        displayMiss(location) {
            const cell = document.getElementById(location);
            cell.classList.add('miss');
        }

        displayMessage(msg) {
            const messageArea = document.querySelector('#messageArea');
            messageArea.textContent = msg;
        }
    }

    function parseGuess(guess) {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        if (guess === null || guess.length !== 2) {
            console.log('Should be 2 symbols');
        } else {
            let letter = guess.charAt(0);
            let column = guess.charAt(1);
            let row = alphabet.indexOf(letter);
            if (isNaN(row) || isNaN(column)) {
                console.log('First symbol should be letter and second - number')
            }
            else if (row < 0 || row >= play.boardSize || column < 0 || column >= play.boardSize) {
                console.log('Should be from A to G and from 0-6')
            } else {
                return row + column;
            }
        }
    }

    function handleFireButton() {
        const input = document.querySelector('#guessInput');
        let value = input.value;
        console.log(value);
        input.value = '';
    }

    function handleKeyPress(e) {
        const btn = document.querySelector("#fireButton");
        if (e.keyCode === 13) {
            btn.click();
            return false;
        }
    }

    function start() {
        const btn = document.querySelector("#fireButton");
        btn.onclick = handleFireButton;

        const input = document.querySelector('#guessInput');
        input.onkeypress = handleKeyPress;
    }

    start();

    const play = new Model();
    const view = new View();
    const div = new Controller('A0');
    // play.generateShip();
    div.processGuess('E5')
    div.processGuess('E3')
    div.processGuess('E2')
    div.processGuess('E1')
    div.processGuess('E0')
    div.processGuess('E6')
    div.processGuess('E7')
    div.processGuess('D0')

});







