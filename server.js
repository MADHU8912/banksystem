const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

let accounts = {
  abhi: { acc: "1001", balance: 0 },
  nikhil: { acc: "1002", balance: 70000 },
  dell: { acc: "1003", balance: 90000 },
  hp: { acc: "1004", balance: 60000 },
  mac: { acc: "1005", balance: 90000 }
};

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.post("/transfer", (req, res) => {
  const { from, to, amount } = req.body;

  if (!accounts[from] || !accounts[to]) {
    return res.status(400).send("Invalid account");
  }

  if (!amount || amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  if (accounts[from].balance >= amount) {
    accounts[from].balance -= amount;
    accounts[to].balance += amount;
    return res.send("Transfer Successful");
  } else {
    return res.status(400).send("Insufficient Balance");
  }
});

app.post("/deposit", (req, res) => {
  const { name, amount } = req.body;

  if (!accounts[name]) {
    return res.status(400).send("Invalid account");
  }

  if (!amount || amount <= 0) {
    return res.status(400).send("Invalid deposit amount");
  }

  accounts[name].balance += amount;
  res.send("Money Added Successfully");
});

app.listen(PORT, () => {
  console.log(`Bank Server running at http://localhost:${PORT}`);
});