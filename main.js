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

    if (btn.dataset.action === "percent") {
        calc.percent();
        calc.updateDisplay();
        return;
    }

    if (btn.dataset.operator) {
        calc.applyOperator(btn.textContent);
        calc.updateDisplay();
        return;
    }

    if (btn.dataset.action === "equals") {
        calc.equals();
        calc.updateDisplay();
        return;
    }

});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key)) {
        calc.appendDigit(key);
        calc.updateDisplay();
        return;
    }

    if (["+", "-", "/", "*"].includes(key)) {
        calc.applyOperator(key);
        calc.updateDisplay();
        return;
    }

    if (key === "." || key === ",") {
        calc.addDecimal();
        calc.updateDisplay();
        return;
    }

    if (key === "%") {
        calc.percent();
        calc.updateDisplay();
        return;
    }

    if (key === "Enter" || key === "=") {
        calc.equals();
        calc.updateDisplay();
        return;
    }

    if (key === "Backspace") {
        calc.delete;
        calc.updateDisplay();
        return;
    }

    if (key === "Escape") {
        calc.clear();
        calc.updateDisplay();
        return;
    }
})