import { useState } from "react"
import { useAddTransactions } from "../../hooks/useAddTransactions"
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useAuth } from "../../layout/context/authProvider";
import { useNavigate } from "react-router";



const Dashboard = () => {
  const { addTransactions } = useAddTransactions()
  const { transactions } = useGetTransactions()

const { logout, user } = useAuth();
    const navigate = useNavigate()


  const [description, setDescription] = useState("")
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [transactionType, setTransactionType] = useState("expense")


  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransactions({
      description,
      transactionAmount: Number(transactionAmount), // convert to number
      transactionType
    });

    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  };


  // Sign Out
  const logOut = async () => {
    await logout();
    navigate("/");
  };

  
  const income = transactions
    .filter(totalIncome => totalIncome.transactionType === "income")
    .reduce((acc, totalIncome) => acc + Number(totalIncome.transactionAmount), 0);

  const expenses = transactions
    .filter(totalExpenses => totalExpenses.transactionType === "expense")
    .reduce((acc, totalExpenses) => acc + Number(totalExpenses.transactionAmount), 0);

  const balance = income - expenses;

  return (
    <>
      <div className="expense tracker">
        <div className="container">
          <button className="logout-btn" onClick={logOut}>
            Sign Out
          </button>
          {user?.profilePic && <div><img src={user?.profilePic} alt="profile-pic" style={{ width: "100px" }} /></div>}
          <h1>{user?.name}&apos;s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>${balance.toFixed(2)}</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income.toFixed(2)}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses.toFixed(2)}</p>
            </div>
          </div>
          <form action="" className="add-transaction" onSubmit={handleSubmit}>
            <input type="text" placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Amount" required value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} />
            <input type="radio" id="expense" value="expense" placeholder="Amount" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
            <label htmlFor="expense">Expense</label>
            <input type="radio" id="income" value="income" placeholder="Amount" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <div className="transaction">
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <div key={index}>
                <h4>{description}</h4>
                <p>${transactionAmount}. <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label> </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Dashboard