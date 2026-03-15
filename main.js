const display = document.querySelector(`.display p`);
display.textContent = "0";

const buttons = document.querySelector(`.buttons`);

buttons.addEventListener("click", (e) => {
    e.preventDefault();
    if (display.textContent === "0") display.textContent = "";
    display.textContent += e.target.textContent;
});