export { Stack };

class Stack {
    constructor() {
        this.stack = [];
    }

    add(element) {
        this.stack.push(element);
    }

    remove() {
        if (!isEmpty())
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