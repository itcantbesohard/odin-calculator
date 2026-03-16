const numberOne = 0;
const numberTwo = 0;
let entered = [];
const ops = "+-*/";

const display = document.querySelector(`.display p`);
display.textContent = "0";

const buttons = document.querySelector(`.buttons`);

buttons.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("btn")) return;
    if (display.textContent === "0") display.textContent = "";
    if (e.target.id === "AC") {
        clearAll();
        return;
    }
    if (e.target.id === "CE") {
        clearEntry();
        return;
    }
    if (e.target.classList.contains("btn-operate")) {
        const last = entered.at(-1);

        if (ops.includes(last)) {
            entered[entered.length - 1] = e.target.textContent;
        } else {
            entered.push(e.target.textContent);
        }

        display.textContent = entered.join("");
        return;
    }

    entered.push(e.target.textContent);
    display.textContent = entered.join("");
});

function clearEntry() {
    entered.pop();
    display.textContent = entered.join("");
    if (entered.length === 0) display.textContent = 0;
}


function clearAll() {
    display.textContent = 0;
    numberOne = 0;
    numberTwo = 0;
    entered = [];
}
