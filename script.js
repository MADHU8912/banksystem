async function loadAccounts(){

let res = await fetch("/accounts")
let data = await res.json()

let html=""

for(let name in data){

html += `
<p>
Name: ${name} |
Acc: ${data[name].acc} |
Balance: ${data[name].balance}
</p>
`

}

document.getElementById("accounts").innerHTML = html

}

async function transfer(){

let from = document.getElementById("from").value
let to = document.getElementById("to").value
let amount = Number(document.getElementById("amount").value)

await fetch("/transfer",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({from,to,amount})
})

loadAccounts()

}