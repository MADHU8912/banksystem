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

  let result = await res.text();
  alert(result);
  loadAccounts();
}