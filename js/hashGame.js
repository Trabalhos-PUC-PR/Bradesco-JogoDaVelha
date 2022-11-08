let current = "";
let log;
let field;
let hasWinner;

function setup() {
    current = "red";
    log = new Stack();
    field = [9];
    hasWinner;
}

function rewind() {
    if(hasWinner){
        hasWinner = "";
        document.body.style.background = ""
    }
    if (log.size() > 0) {
        const lastMove = log.remove();
        const coords = parsePos(lastMove);
        const arrayIndex = coords.y * 3 + coords.x;
        field[arrayIndex] = undefined;

        const elem = document.querySelector('[pos="'+lastMove+'"]')
        elem.removeAttribute("value");
        elem.style.background = "";

        if (current === "red") {
            current = "blue";
        } else {
            current = "red";
        }

    }
    console.log(log.size())
    console.log(field)
}

function placePiece(element) {
    if (!hasWinner) {

        const value = element.getAttribute("value");
        color = element.style.background;
        if (!value) {
            const pos = element.getAttribute("pos");

            log.add(pos);
            const coords = parsePos(pos);
            const arrayIndex = coords.y * 3 + coords.x;
            field[arrayIndex] = current;

            element.setAttribute("value", current);
            element.style.background = current;

            if (current === "red") {
                current = "blue";
            } else {
                current = "red";
            }

            hasWinner = checkWin();
            if (hasWinner) {
                let setcolor = ""
                if (hasWinner === "red") {
                    setcolor = "LightSalmon"
                } else {
                    setcolor = "LightSkyBlue"
                }
                document.body.style.background = setcolor
            }

        }
    }
}

function checkWin() {
    // checks if theres a piece in  each of the compared places, then if they are all the same
    if (field[0] && field[1] && field[2] && field[0] == field[1] && field[1] == field[2])
        return field[0]
    if (field[3] && field[4] && field[5] && field[3] == field[4] && field[4] == field[5])
        return field[3]
    if (field[6] && field[7] && field[8] && field[6] == field[7] && field[7] == field[8])
        return field[6]

    if (field[0] && field[3] && field[6] && field[0] == field[3] && field[3] == field[6])
        return field[0]
    if (field[1] && field[4] && field[7] && field[1] == field[4] && field[4] == field[7])
        return field[1]
    if (field[2] && field[5] && field[8] && field[2] == field[5] && field[5] == field[8])
        return field[2]

    if (field[0] && field[4] && field[8] && field[0] == field[4] && field[4] == field[8])
        return field[0]
    if (field[2] && field[4] && field[6] && field[2] == field[4] && field[4] == field[6])
        return field[2]

}

function parsePos(pos) {
    const split = pos.split(',');
    const y = parseInt(split[0]);
    const x = parseInt(split[1]);
    return { y, x };
}

class Stack {
    constructor() {
        this.stack = [];
    }

    add(element) {
        this.stack.push(element);
    }

    remove() {
        if (!this.isEmpty())
            return this.stack.pop();
        return null;
    }

    isEmpty() {
        return this.stack.length == 0;
    }

    size() {
        return this.stack.length;
    }

    clear() {
        this.stack = [];
    }
}