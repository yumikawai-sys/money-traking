import './App.css';
import { useState, useEffect } from 'react';

function App() {

  let [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState('');

  // Add each transaction 
  const addNewTrasaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  }

  // When click "Add New Transaction"
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validation Check
    if (!name || !description || !datetime) {
      alert("Name, Date, or Description are required.")
      return;
    }

    // format check of "name"
    const regex = /^[-+]\d+\s[A-Za-z]+$/;
    if (!regex.test(name)) {
      alert("Name format is wrong! (e.g. +100 Allowance)")
      return;
    }
    
    // Derive price from name
    const price = name.split(" ")[0];
    name = name.substring(price.length + 1);
    const url = "http://localhost:4000/transaction";

    fetch(url, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({name, price, description, datetime})
    })
    .then(res=>res.json())
    .then(json=> {
      // To clear the form
      setName("");
      setDatetime("");
      setDescription("");
    })
    .catch(error => console.error("Error", error))

    // Add to the transactions
    const newTransaction = {
      name, price, description, datetime
    };

    addNewTrasaction(newTransaction);
  };

  // Initial render
  useEffect(()=> {
    getTransactions()
    .then(transactions => {
      setTransactions(transactions)
    })
  },[])

  async function getTransactions() {
    const getURL = "http://localhost:4000/api/transactions";
    // const getURL = process.env.REACT_APP_API_URL + "/api/tranactions";
    const res = await fetch(getURL);
    return await res.json();
  }

  // Calculate the balance
  let balance = 0;
  
  for (const transaction of transactions) {
    balance = balance + parseInt(transaction.price);
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={handleFormSubmit}>
        <div className="basic">
          <input type="text"
            onChange={ev=>setName(ev.target.value)}
            placeholder={"eg. +200 TV"}
          >
          </input>
          <input type="datetime-local"
            onChange={ev=>setDatetime(ev.target.value)}
          >
          </input>
        </div>
        <div className='description'>
          <input type="text"
            onChange={ev=>setDescription(ev.target.value)}
            placeholder={"description"}>
          </input>
          <button type="submit">Add New Transaction</button>
        </div>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map((tr)=> (
          <div className="transaction" key={tr._id}>
            <div className="left">
              <div className="name">{tr.name}</div>
              <div className="description">{tr.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (tr.price < 0 ? "red":"green")}>{tr.price}</div>
              <div className="datetime">{tr.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
