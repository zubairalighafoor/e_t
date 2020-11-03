import React, { useContext, useState } from 'react';
import { TransactionContext } from './transContext.js'

function Child() {
    let { transactions ,addTransaction} = useContext(TransactionContext)
    let [newDesc, setDesc] = useState("");
    let [newAmount, setAmount] = useState(0);

    const handleAddition = (event) => {
        event.preventDefault();
        if(Number(newAmount)===0){
            alert("Please Enter Correct Value");
            return false;
        }
        addTransaction({
            amount:Number(newAmount),
            desc:newDesc
        });
        setDesc("");
        setAmount(0);
         
    }
    const getIncome=()=>{
        let income=0;
        for(var i=0;i<transactions.length;i++){
            if(transactions[i].amount>0){
                income+=transactions[i].amount;
            }
        }
        return income;
    }
    const getExpense=()=>{
        let expense=0;
        for(var i=0;i<transactions.length;i++){
            if(transactions[i].amount<0){
                expense+=transactions[i].amount;
            }
        }
        return expense;
    }
    return (
        <div className="container">
            <h1 className="text-center">EXPENSE TRACKER</h1>
            <h3>YOUR BALANCE <br /> PKR/_{getIncome()+getExpense()}</h3>
            <div className="expense-container">
                <h3>INCOME <br /> PKR/_{getIncome()}</h3>
                <h3>EXPENSE <br /> PKR/_{getExpense()}</h3>
            </div>
            <div>
                <h3>HISTORY</h3>
                <hr />
                <ul className="transaction-list">
                    {transactions.map((transobj, ind) => {
                        return (
                            <li key={ind}>
                                <span>{transobj.desc}</span>
                                <span>PKR/_{transobj.amount}</span>
                            </li>
                        )
                    })}
                </ul>
                <h3>ADD TRANSACTION</h3>
                <hr />
                <form className="transaction-form" onSubmit={handleAddition}>
                    <label>
                        ENTER DESCRIPTION<br />
                        <input type="text" value={newDesc} onChange={(ev)=>setDesc(ev.target.value)} placeholder="Enter Description" required />
                    </label>
                    <br />
                    <label>
                        ENTER AMOUNT<br />
                        <input type="number" value={newAmount} onChange={(ev)=>setAmount(ev.target.value)} placeholder="Enter Amount" required />
                    </label>
                    <br />
                    <input type="submit" value="Add Transaction" />
                </form>
            </div>
        </div>
    )
}
export default Child;