async function loadAccounts() {
  let res = await fetch("/accounts");
  let data = await res.json();

  let html = `
    <table class="account-table">
      <tr>
        <th>Name</th>
        <th>Account Number</th>
        <th>Balance</th>
      </tr>
  `;

  for (let name in data) {
    html += `
      <tr>
        <td>${name}</td>
        <td>${data[name].acc}</td>
        <td>₹${data[name].balance}</td>
      </tr>
    `;
  }

  html += `</table>`;
  document.getElementById("accounts").innerHTML = html;
}

async function transfer() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let amount = Number(document.getElementById("amount").value);

  let res = await fetch("/transfer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, amount })
  });

  let msg = await res.text();
  alert(msg);
  loadAccounts();
}

async function loadCustomerDashboard() {
  const name = localStorage.getItem("customerName");
  document.getElementById("custName").innerText = "Welcome: " + name;

  let res = await fetch("/accounts");
  let data = await res.json();

  if (data[name]) {
    document.getElementById("customerDetails").innerHTML = `
      <p><b>Name:</b> ${name}</p>
      <p><b>Account Number:</b> ${data[name].acc}</p>
      <p><b>Balance:</b> ₹${data[name].balance}</p>
    `;
  }
}

async function viewBalance() {
  const name = localStorage.getItem("customerName");
  let res = await fetch("/accounts");
  let data = await res.json();

  alert(`Current Balance: ₹${data[name].balance}`);
}

function miniStatement() {
  alert("Mini Statement:\\n1. Deposit +₹5000\\n2. Transfer -₹2000\\n3. Cashback +₹500");
}

function downloadPassbook() {
  alert("Passbook download started");
}

async function depositMoney() {
  const name = localStorage.getItem("customerName");
  const amount = Number(document.getElementById("depositAmount").value);

  let res = await fetch("/deposit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amount })
  });

  let msg = await res.text();
  alert(msg);
  loadCustomerDashboard();
}