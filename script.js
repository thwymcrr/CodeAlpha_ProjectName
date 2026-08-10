let expression = document.querySelector(".expression");

let result = document.querySelector(".result");

let buttons = document.querySelectorAll(".button");


let currentValue = "";

let firstValue = "";

let operator = "";

let justCalculated = false;



// ======================================
// BUTTON CLICK FUNCTION
// ======================================

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.innerText;


        // ======================================
        // OPERATORS
        // ======================================

        if (
            value == "+" ||
            value == "-" ||
            value == "*" ||
            value == "/"
        ) {

            if (currentValue == "") {
                return;
            }


            firstValue = currentValue;

            operator = value;


            expression.innerText =
                firstValue + " " + operator;


            currentValue = "";


            // Keep result area empty
            result.innerText = "";


            justCalculated = false;
        }


        // ======================================
        // NUMBERS
        // ======================================

        else if (
            value != "=" &&
            value != "AC" &&
            value != "⌫" &&
            value != "%" &&
            value != "."
        ) {


            // If previous calculation is completed
            if (justCalculated) {

                currentValue = "";

                firstValue = "";

                operator = "";

                expression.innerText = "";

                justCalculated = false;
            }


            currentValue =
                currentValue + value;


            // If operator exists
            if (operator != "") {

                expression.innerText =
                    firstValue + " " +
                    operator + " " +
                    currentValue;


                // Don't show second number
                // in large result area
                result.innerText = "";
            }

            else {

                result.innerText =
                    currentValue;
            }

        }


        // ======================================
        // DECIMAL
        // ======================================

        else if (value == ".") {


            if (!currentValue.includes(".")) {


                if (currentValue == "") {

                    currentValue = "0.";
                }

                else {

                    currentValue =
                        currentValue + ".";
                }


                if (operator != "") {

                    expression.innerText =
                        firstValue + " " +
                        operator + " " +
                        currentValue;


                    result.innerText = "";
                }

                else {

                    result.innerText =
                        currentValue;
                }

            }

        }


        // ======================================
        // EQUALS
        // ======================================

        else if (value == "=") {


            if (
                firstValue == "" ||
                operator == "" ||
                currentValue == ""
            ) {

                return;
            }


            let secondValue =
                currentValue;


            let answer;


            // Addition

            if (operator == "+") {

                answer =
                    Number(firstValue) +
                    Number(secondValue);
            }


            // Subtraction

            else if (operator == "-") {

                answer =
                    Number(firstValue) -
                    Number(secondValue);
            }


            // Multiplication

            else if (operator == "*") {

                answer =
                    Number(firstValue) *
                    Number(secondValue);
            }


            // Division

            else if (operator == "/") {


                if (Number(secondValue) == 0) {


                    expression.innerText =
                        firstValue +
                        " / " +
                        secondValue;


                    result.innerText =
                        "Error";


                    currentValue = "";

                    firstValue = "";

                    operator = "";


                    return;
                }


                answer =
                    Number(firstValue) /
                    Number(secondValue);
            }


            // Show complete expression

            expression.innerText =
                firstValue + " " +
                operator + " " +
                secondValue;


            // Show answer

            result.innerText =
                answer;


            // Store answer

            currentValue =
                String(answer);


            firstValue = "";

            operator = "";


            justCalculated = true;

        }


        // ======================================
        // AC
        // ======================================

        else if (value == "AC") {


            currentValue = "";

            firstValue = "";

            operator = "";


            expression.innerText = "";

            result.innerText = "0";


            justCalculated = false;

        }


        // ======================================
        // BACKSPACE
        // ======================================

        else if (value == "⌫") {


            currentValue =
                currentValue.slice(0, -1);


            if (operator != "") {


                expression.innerText =
                    firstValue + " " +
                    operator + " " +
                    currentValue;


                result.innerText = "";

            }

            else {


                if (currentValue == "") {

                    result.innerText = "0";
                }

                else {

                    result.innerText =
                        currentValue;
                }

            }

        }


        // ======================================
        // PERCENTAGE
        // ======================================

        else if (value == "%") {


            if (currentValue == "") {

                return;
            }


            currentValue =
                String(Number(currentValue) / 100);


            if (operator != "") {


                expression.innerText =
                    firstValue + " " +
                    operator + " " +
                    currentValue;


                result.innerText = "";

            }

            else {

                result.innerText =
                    currentValue;
            }

        }

    });

});



// ======================================
// KEYBOARD SUPPORT
// ======================================


// Function to press calculator button

function pressButton(value) {


    buttons.forEach(function(button) {


        if (button.innerText == value) {

            button.click();
        }

    });

}



// Keyboard event

document.addEventListener("keydown", function(event) {


    let key = event.key;


    // Numbers

    if (key >= "0" && key <= "9") {

        pressButton(key);
    }


    // Operators

    else if (
        key == "+" ||
        key == "-" ||
        key == "*" ||
        key == "/"
    ) {

        pressButton(key);
    }


    // Equals

    else if (
        key == "Enter" ||
        key == "="
    ) {

        pressButton("=");
    }


    // Backspace

    else if (key == "Backspace") {

        pressButton("⌫");
    }


    // AC

    else if (key == "Escape") {

        pressButton("AC");
    }


    // Percentage

    else if (key == "%") {

        pressButton("%");
    }


    // Decimal

    else if (key == ".") {

        pressButton(".");
    }

});