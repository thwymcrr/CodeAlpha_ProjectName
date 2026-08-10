let expression = document.querySelector(".expression");
let result = document.querySelector(".result");

let buttons = document.querySelectorAll(".button");

let currentValue = "";
let firstValue = "";
let operator = "";

let justCalculated = false;


buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.innerText;


        // =========================
        // OPERATORS
        // =========================

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

            // Keep result EMPTY
            result.innerText = "";

            justCalculated = false;
        }


        // =========================
        // NUMBERS
        // =========================

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

            currentValue = currentValue + value;

            // If operator is present
            if (operator != "") {

                expression.innerText =
                    firstValue + " " +
                    operator + " " +
                    currentValue;

                // IMPORTANT:
                // Do NOT show currentValue
                // in the big result area
                result.innerText = "";
            }

            else {

                // Normal number entry
                result.innerText = currentValue;
            }
        }


        // =========================
        // DECIMAL
        // =========================

        else if (value == ".") {

            if (!currentValue.includes(".")) {

                if (currentValue == "") {
                    currentValue = "0.";
                }
                else {
                    currentValue = currentValue + ".";
                }

                if (operator != "") {

                    expression.innerText =
                        firstValue + " " +
                        operator + " " +
                        currentValue;

                    result.innerText = "";
                }

                else {
                    result.innerText = currentValue;
                }
            }
        }


        // =========================
        // EQUALS
        // =========================

        else if (value == "=") {

            if (
                firstValue == "" ||
                operator == "" ||
                currentValue == ""
            ) {
                return;
            }

            let secondValue = currentValue;
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
                        firstValue + " / " + secondValue;

                    result.innerText = "Error";

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

            // Show answer in BIG display
            result.innerText = answer;

            currentValue = String(answer);

            firstValue = "";
            operator = "";

            justCalculated = true;
        }


        // =========================
        // AC
        // =========================

        else if (value == "AC") {

            currentValue = "";
            firstValue = "";
            operator = "";

            expression.innerText = "";
            result.innerText = "0";

            justCalculated = false;
        }


        // =========================
        // BACKSPACE
        // =========================

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
                    result.innerText = currentValue;
                }
            }
        }


        // =========================
        // PERCENTAGE
        // =========================

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

                result.innerText = currentValue;
            }
        }

    });

});