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
        calc.applyOperator(btn.textContent);
        calc.updateDisplay();
        return;
    }



});