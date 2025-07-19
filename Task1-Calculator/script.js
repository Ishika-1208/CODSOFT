let currentInput = "";
let operator = "";
let previousInput = "";

function updateDisplay() {
  document.getElementById("display").textContent = currentInput || "0";
  document.getElementById("expression").textContent = previousInput + " " + operator;
}

function appendNumber(num) {
  if (num === "." && currentInput.includes(".")) return;
  currentInput += num;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  operator = "";
  previousInput = "";
  updateDisplay();
}

function deleteLastChar() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (currentInput === "" || previousInput === "") return;
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "×":
      result = prev * curr;
      break;
    case "÷":
      result = curr === 0 ? "Error" : prev / curr;
      break;
    case "%":
      result = prev % curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay();
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
      appendNumber(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
      const opMap = { "*": "×", "/": "÷" };
      appendOperator(opMap[key] || key);
    } else if (key === "Enter" || key === "=") {
      calculate();
    } else if (key === "Backspace") {
      deleteLastChar();
    } else if (key.toLowerCase() === "c") {
      clearAll();
    }
  });
};
