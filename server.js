const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

let accounts = {
  abhi: { acc: "1001", balance: 5000 },
  nikhil: { acc: "1002", balance: 7000 },
  dell: { acc: "1003", balance: 4000 },
  hp: { acc: "1004", balance: 6000 },
  mac: { acc: "1005", balance: 9000 }
};

app.get("/accounts", (req,res)=>{
  res.json(accounts);
});

app.post("/transfer",(req,res)=>{

  const {from,to,amount} = req.body;

  if(accounts[from].balance >= amount){
      accounts[from].balance -= amount;
      accounts[to].balance += amount;
      res.json(accounts);
  }else{
      res.send("Insufficient Balance");
  }

});

app.listen(3000, ()=>{
 console.log("Bank Server running http://localhost:3000");
});