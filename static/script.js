const numberInput = document.getElementById("number");
const analyzeBtn = document.getElementById("analyzeBtn");
const errorMessage = document.getElementById("errorMessage");
const result = document.getElementById("result");

analyzeBtn.addEventListener("click", async () => {

    const numberValue = numberInput.value.trim();

    // Clear old error
    errorMessage.classList.remove("show");
    errorMessage.textContent = "";

    // Empty input
    if (numberValue === "") {
        errorMessage.textContent = "Please enter a number.";
        errorMessage.classList.add("show");
        result.innerHTML = "";
        return;
    }

    // Invalid input
    if (!/^\d+$/.test(numberValue)) {
        errorMessage.textContent = "Please enter a valid positive number.";
        errorMessage.classList.add("show");
        result.innerHTML = "";
        return;
    }

    const number = Number(numberValue);

    // Zero and negative validation
    if (number <= 0) {
        errorMessage.textContent = "Please enter a number greater than 0.";
        errorMessage.classList.add("show");
        result.innerHTML = "";
        return;
    }

    try {

        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                number: number
            })
        });

        const data = await response.json();

        console.log(data);

        // Backend error
        if (!response.ok) {
            errorMessage.textContent =
                data.error || "Something went wrong.";

            errorMessage.classList.add("show");
            result.innerHTML = "";
            return;
        }

        // Boolean formatting
        const formatBoolean = (value) => {
            if (typeof value === "boolean") {
                return value ? "True" : "False";
            }

            return value;
        };

        

        const booleanClass = (value) => {
            if (typeof value === "boolean") {
                return value ? "true" : "false";
            }

            return "";
        };

        // Display result
        result.innerHTML = `
            <p>Number: ${data.data.Number}</p>

            <p>
                Even / Odd: ${data.data["Even or Odd"]}
            </p>

            <p>
                Prime:
                <span class="result-value ${booleanClass(data.data.Prime)}">
                    ${formatBoolean(data.data.Prime)}
                </span>
            </p>

            <p>
                Reverse: ${data.data.Reverse}
            </p>

            <p>
                Palindrome:
                <span class="result-value ${booleanClass(data.data.Palindrome)}">
                    ${formatBoolean(data.data.Palindrome)}
                </span>
            </p>

            <p>
                Sum of The Digit: ${data.data["Sum Of The Digit"]}
            </p>

            <p>
                Largest Number: ${data.data["Largest Number"]}
            </p>

            <p>
                Smallest Number: ${data.data["Smallest Number"]}
            </p>

            <p>
                No Of Digits: ${data.data["No Of Digits"]}
            </p>

            <p>
                Armstrong Number:
                <span class="result-value ${booleanClass(data.data["Armstrong Number"])}">
                    ${formatBoolean(data.data["Armstrong Number"])}
                </span>
            </p>

            <p>
                Factors: ${data.data.Factors}
            </p>
        `;

    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            "Unable to connect to the server.";

        errorMessage.classList.add("show");
        result.innerHTML = "";
    }
});