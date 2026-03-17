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
    }

    applyOperator(op) {

        // if change operator
        if (this.operator && this.overwrite) {
            this.operator = op;
            return;
        }

        // if first time
        if (!this.operator && !this.previous && !this.overwrite) {
            this.previous = this.current;
            this.operator = op;
            this.overwrite = true;
        }

        // after second digit
        if (this.operator && this.current && this.previous && !this.overwrite) {
            console.log(this.previous, this.current, this.operator)
            const result = this.operate(this.previous, this.current, this.operator);
            this.previous = String(result);
            this.operator = op;
            this.overwrite = true;
        }
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