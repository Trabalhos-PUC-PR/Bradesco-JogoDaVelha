import { Stack } from './stack.mjs'
import { CPU } from './CPU.mjs'

let current;
let log;
let field;
let hasWinner;
let IA;
let selectedDiff;

function setup() {
    current = "red";
    log = new Stack();
    field = [];
    for (let i = 0; i < 9; i++)
        field[i] = undefined;
    IA = new CPU();
}

window.rewind = function () {
    if (hasWinner || log.size() == 9) {
        hasWinner = "";
        document.body.style.background = ""
    }
    if (log.size() > 0) {
        const lastMove = log.remove();
        const coords = parsePos(lastMove);
        const arrayIndex = coords.y * 3 + coords.x;
        field[arrayIndex] = undefined;

        const elem = document.querySelector('[pos="' + lastMove + '"]')
        elem.removeAttribute("value");
        elem.style.background = "";

        if (current === "red") {
            current = "blue";
        } else {
            current = "red";
        }
    } 

    if(log.size() == 0){
        selectedDiff = undefined;
        document.getElementById('cpu-settings').style.display = 'block';
        document.getElementById('rewindButton').style.display = 'none';
    }

    if(current === "blue" && selectedDiff >= 0){
        rewind();
    }
}

window.placePiece = function (element) {
    if(!selectedDiff){
        selectedDiff = document.querySelector('input[name="diff"]:checked').value;
        IA.setDifficulty(selectedDiff);
        document.getElementById('cpu-settings').style.display = 'none';
        document.getElementById('rewindButton').style.display = 'block';
    }
    if (!hasWinner) {

        const value = element.getAttribute("value");
        if (!value) {
            const pos = element.getAttribute("pos");

            log.add(pos);
            const coords = parsePos(pos);
            const arrayIndex = coords.y * 3 + coords.x;
            field[arrayIndex] = current;

            element.setAttribute("value", current);
            element.style.background = current;

            hasWinner = checkWin(field);

            if (current === "red") {
                current = "blue";
            } else {
                current = "red";
            }

            if (hasWinner) {
                let setcolor = ""
                if (hasWinner === "red") {
                    setcolor = "LightSalmon"
                } else {
                    setcolor = "LightSkyBlue"
                }
                document.body.style.background = setcolor
            } else {
                if (log.size() == 9) {
                    document.body.style.background = 'LightGrey'
                }
            }
            if (!hasWinner && selectedDiff >=0 && current == "blue") {
                const CPUplay = IA.getBestPlay(IA.classify(IA.getPossiblePlays(field)));

                const elem = document.querySelector('[pos="' + CPUplay.play.pos + '"]');
                placePiece(elem);
            }
        }
    }
}


export function checkWin(field, color = current) {
    // checks if theres a piece in  each of the compared places, then if they are all the same
    if (color == field[0] && field[0] && field[1] && field[2] && field[0] == field[1] && field[1] == field[2])
        return field[0]
    if (color == field[3] && field[3] && field[4] && field[5] && field[3] == field[4] && field[4] == field[5])
        return field[3]
    if (color == field[6] && field[6] && field[7] && field[8] && field[6] == field[7] && field[7] == field[8])
        return field[6]

    if (color == field[0] && field[0] && field[3] && field[6] && field[0] == field[3] && field[3] == field[6])
        return field[0]
    if (color == field[1] && field[1] && field[4] && field[7] && field[1] == field[4] && field[4] == field[7])
        return field[1]
    if (color == field[2] && field[2] && field[5] && field[8] && field[2] == field[5] && field[5] == field[8])
        return field[2]

    if (color == field[0] && field[0] && field[4] && field[8] && field[0] == field[4] && field[4] == field[8])
        return field[0]
    if (color == field[2] && field[2] && field[4] && field[6] && field[2] == field[4] && field[4] == field[6])
        return field[2]
}

function parsePos(pos) {
    const split = pos.split(',');
    const y = parseInt(split[0]);
    const x = parseInt(split[1]);
    return { y, x };
}

setup()