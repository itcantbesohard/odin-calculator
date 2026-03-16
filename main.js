import { Calculator } from "./Calculator.js";

const display = document.querySelector(`.display p`);
const buttons = document.querySelector(`.buttons`);

const calc = new Calculator(display);

buttons.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    if (btn.dataset.number) {
        calc.appendDigit(btn.dataset.number);
        calc.updateDisplay();
        return;
    }

    if (btn.dataset.action === "AC") {
        calc.clear();
        calc.updateDisplay();
        return;
    }

    if (btn.dataset.action === "CE") {
        calc.delete();
        calc.updateDisplay();
        return;
    }

    if (btn.dataset.action === "decimal") {
        calc.addDecimal();
        calc.updateDisplay();
        return;
    }

    if (btn.dataset.operator) {
        if (calc.previous && calc.operator) {
            calc.previous = calc.operate(calc.previous, calc.current, calc.operator);
        }
        if (!calc.previous) calc.previous = calc.current;
        calc.operator = btn.textContent;
        calc.updateDisplay();
        calc.current = calc.previous;
        return;
    }

});