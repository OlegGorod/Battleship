
class Model {
    constructor(boardsize, numShips, shipLength, shipsSunk, ships) {
        ships = [
            { locations: ['00', '01', '02'], hits: ['', '', ''] },
            { locations: ['20', '21', '22'], hits: ['', '', ''] },
            { locations: ['45', '46', '47'], hits: ['', '', ''] }
        ]
        this.boardsize = boardsize;
        this.numShips = numShips;
        this.shipLength = shipLength;
        this.shipsSunk = shipsSunk;
        this.ships = ships;
    }

    boardsize = 7;
    numShips = 3;
    shipLength = 3;
    shipsSunk = 0;

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


class Controller extends Model {
    constructor(guess, guesses) {
        super(guess);
        guesses = 0;
        this.processGuess();
    }

    parseGuess(guess) {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        if (guess === null || guess.length !== 2) {
            console.log('Should be 2 symbols');
        } else {
            let letter = guess.charAt(0);
            let column = guess.charAt(1);
            let row = alphabet.indexOf(letter);
            console.log(row)
            if (isNaN(row) || isNaN(column)) {
                console.log('First symbol should be letter and second - number')
            }
            else if (row < 0 || row >= play.boardSize || column < 0 || column >= play.boardSize) {
                console.log('Should be from A to G and from 0-6')
            } else return row + column;
        }
        return null;
    }

    processGuess(guess) {
        let location = this.parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = play.fire(location);
            if (hit && this.shipsSunk === this.numShips) {
                view.displayMessage(`You sank all Battleships and in ${this.guesses} guesses.`)
            }
        }
    }
}

class View extends Model {
    // constructor(displayHit, displayMiss, displayMessage,cell) {
    //     super(displayHit,displayMessage,displayMiss)
    //     this.cell = cell;
    //     this.displayHit();
    //     this.displayMiss();
    //     this.displayMessage();
    // }
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

const view = new View();
const play = new Model();
const div = new Controller();
div.processGuess('A0')

// controller.processGuess("A0"); controller.processGuess("A6"); controller.processGuess("B6"); controller.processGuess("C6"); controller.processGuess("C4"); controller.processGuess("D4"); controller.processGuess("E4"); controller.processGuess("B0"); controller.processGuess("B1"); controller.processGuess("B2");






