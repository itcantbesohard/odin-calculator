export class Calculator {
    current = 0;
    previous = null;
    operator = null;
    overwrite = true;
    displayEl = null;

    constructor(displayEl) {
        this.displayEl = displayEl;
        this.clear();
        this.updateDisplay();
    }

    clear() {
        this.current = 0;
        this.previous = null;
        this.operator = null;
        this.overwrite = true;
    }

    delete() {
        if (this.current === 0 || this.current === null) {
            this.current = 0;
            return;
        }
        const str = String(this.current);
        this.current = str.slice(0, -1);

        if (this.current === "") this.current = 0;
    }

    updateDisplay() {
        if (this.operator && this.overwrite) {
            this.displayEl.textContent = `${this.previous}${this.operator}`;
            return;
        }
        this.displayEl.textContent = this.current;
    }

    appendDigit(digit) {
        if (this.current === 0 || this.overwrite === true) {
            this.current = digit;
            this.overwrite = false;
            return;
        }
        this.current += digit;
    }

    addDecimal() {
        const str = String(this.current);
        if (str.includes(".")) return;
        this.current += ".";
        this.overwrite = false;
        console.log(this.current, this.overwrite);
    }

    applyOperator(op) {

        // minus at start
        if (op === "-" && this.previous === null && this.current === 0 && this.overwrite) {
            this.current = "-";
            this.overwrite = false;
            return;
        }

        // minus after operator
        if (op === "-" && this.operator && this.overwrite) {
            this.current = "-";
            this.overwrite = false;
            return;
        }

        // if first time
        if (!this.operator) {
            this.previous = this.current;
            this.operator = op;
            this.overwrite = true;
            return;
        }

        // if change operator
        if (this.overwrite) {
            this.operator = op;
            return;
        }

        // after second digit or equals
        const result = this.operate(this.previous, this.current, this.operator);
        this.previous = String(result);
        this.operator = op;
        this.overwrite = true;
    }

    percent() {

        const b = Number(this.current);

        // % without operator 
        if (!this.operator || this.previous === null) {
            this.current = String(b / 100);
            this.overwrite = false;
            return;
        }

        const a = Number(this.previous);

        let result;

        if (this.operator === "+" || this.operator === "-") {
            result = a * (b / 100);
        } else {
            result = b / 100;
        }

        this.current = String(result);
        this.overwrite = false;
    }

    equals() {
        if (!this.operator && !this.previous) return;
        if (this.overwrite) return;

        const result = this.operate(this.previous, this.current, this.operator);
        this.current = String(result);
        this.overwrite = true;
        this.operator = null;
        this.previous = null;
    }

    operate(a, b, operator) {

        a = Number(a);
        b = Number(b);

        let result;

        switch (operator) {
            case "+": result = a + b; break;
            case "-": result = a - b; break;
            case "*": result = a * b; break;
            case "/":
                if (b === 0) return "Error";
                result = a / b;
                break;
            default:
                return "Error";
        }

        return result;
    }
}