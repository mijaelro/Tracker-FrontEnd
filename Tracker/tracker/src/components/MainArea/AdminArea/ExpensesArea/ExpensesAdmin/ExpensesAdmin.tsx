import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ClientType from "../../../../../Models/ClientTypeModel";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import store from "../../../../../Redux/Store";
import ExpensesCards from "../ExpensesCards/ExpensesCards";
import "./ExpensesAdmin.css";
import { Input } from "reactstrap";

function ExpensesAdmin(): JSX.Element {

    const [expenses,setExpenses] = useState(store.getState().expensesState.expenses);
    const history= useHistory();
    const[filteredExpenses,setFilteredExpenses] = useState([]);
    const [search,setSearch] = useState('');
   
  useEffect(() => {
    setFilteredExpenses( expenses.filter((e)=>{
    return e.name.toLowerCase().includes(search.toLowerCase())}));
  },[search,expenses]);
  
  useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.admin) {
      notify.error(ErrMsg.PLS_LOGIN);
      history.push("/login");
  };
    const unsubscribe = store.subscribe(()=>{
      setExpenses(store.getState().expensesState.expenses);
    });
    return unsubscribe;
  });

    return (
        <div className="Expenses section">
            <h1 id="niceTitle"> Expenses</h1>
            <h3 id="white">There are <span id="numOfItems">{expenses.length}</span> expense(s) on the system</h3>
          
          <div className="shortWidth">
            <Input
              type="text"
              placeholder='Search...'
              spellCheck={false}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
        
        <ExpensesCards expenses={filteredExpenses}/>
                
        </div>
    );
}

export default ExpensesAdmin;
