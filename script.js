let display = document.querySelector(".display");

let buttons = document.querySelectorAll(".button");

let currentValue = "";

buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        currentValue = currentValue + button.innerText;
        display.innerText = currentValue;
        
    });
});