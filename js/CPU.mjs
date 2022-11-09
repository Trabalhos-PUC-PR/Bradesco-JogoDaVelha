import { checkWin } from '../js/hashGame.js';

export class CPU {
    constructor() {
        this.difficulty = 0;
        this.color = "blue"
    }

    getPossiblePlays(field, color = this.color) {
        let plays = []
        let count = 0;
        while (count < field.length) {
            if (!field[count]) {
                let possibleField = [...field];
                possibleField[count] = color;
                let yPos = parseInt(count / 3);
                let xPos = count - yPos * 3;
                plays.push({ 'field': possibleField, 'pos': (yPos + ',' + xPos) })
            }
            count++;
        }
        return plays;
    }

    classify(plays) {
        let classification = []

        plays.forEach(play => {

            let classified;
            let opponentPlays = this.getPossiblePlays(play.field, "red")
            opponentPlays.forEach(opponentPlay => {
                if (!classified && checkWin(opponentPlay.field, "red")) {
                    classification.push({
                        'value': -1,
                        'play': play
                    });
                    classified = "yes";
                }
            });

            if (classified) {
                return;
            }

            if (checkWin(play.field, this.color)) {
                classification.push({
                    'value': 1,
                    'play': play
                });
            }
            classification.push({
                'value': 0,
                'play': play
            });

        });

        return classification;
    }

    getBestPlay(plays) {
        plays.sort(this.compare);

        console.log(plays);

        if (plays[plays.length - 1].value == 1)
            return plays[plays.length - 1];

        if (plays[0].value == -1)
            return plays[0];

        return plays[Math.floor((Math.random() * plays.length))];

    }

    compare(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    }

}