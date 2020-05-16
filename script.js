const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("balance");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Sell Camera", amount: 120 },
// ];
const localItems = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localItems : [];

//add transactions

function addTransactions(e) {
  e.preventDefault();
  if (
    e.target.text.value.trim() === "" ||
    e.target.amount.value.trim() === ""
  ) {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      text: e.target.text.value,
      amount: +e.target.amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocal();
    e.target.text.value = "";
    e.target.amount.value = "";
  }
}

//add trasaction to DOM
function addTransactionDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">X</button>
    `;
  list.appendChild(item);
}

//update the balance,inc,exp
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((item, acc) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((item, acc) => (acc += item), 0);
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((item, acc) => (acc -= item) * -1, 0);

  balance.innerHTML = `<span class="inr-sign"> ${total}`;
  money_plus.innerHTML = `<span class="inr-sign"> ${income}`;
  money_minus.innerHTML = `<span class="inr-sign"> ${expense}`;
}
//update local

function updateLocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeFromTransaction(input) {
  let sign = "";
  input.textContent.indexOf("-") > -1 ? (sign = "-") : (sign = "+");
  let a = input.textContent.trim().split(sign);
  transactions.forEach((item, index) => {
    if (item.text.indexOf(a[0]) > -1) {
      transactions.splice(index, 1);
      updateValues();
      updateLocal();
    }
  });
}

function deleteExp(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    removeFromTransaction(e.target.parentElement);
  }
}
//init app
(function innit() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
})();

form.addEventListener("submit", addTransactions);
list.addEventListener("click", deleteExp);
