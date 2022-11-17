import { checkWin } from './Tic-tac-toe.js';

export class CPU {
    constructor(difficulty) {
        // 0 = easy
        // 1 = medium
        // 2 = expert
        this.color = "blue"
    }

    setDifficulty(difficulty){
        this.difficulty = parseInt(difficulty);
        console.log("setted difficulty as ["+difficulty+"]");
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

            if (this.difficulty > 0) {
                // decisive piece placement to victory
                if (checkWin(play.field, this.color)) {
                    classification.push({
                        'value': 1,
                        'play': play
                    });
                    return
                }

                if(this.difficulty == 2){
                let classified;
                // simulates every opponent piece placement with current placement
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
            }
            }
            // piece placements that are not decisive
            classification.push({
                'value': 0,
                'play': play
            });

        });

        return classification;
    }

    getBestPlay(plays) {
        plays.sort(this.compare);

        console.log(plays)

        // if theres any decisive placement, chose that placement
        if (plays[plays.length - 1].value == -1 || plays[0].value == 1)
            return plays[0];

        // if not, next placement is random
        return plays[Math.floor((Math.random() * plays.length))];

    }

    compare(a, b) {
        if (a.value > b.value) {
            return -1;
        }
        if (a.value < b.value) {
            return 1;
        }
        return 0;
    }

}