import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Input} from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import store from "../../../../../Redux/Store";
import ExpensesCards from "../ExpensesCards/ExpensesCards";
import "./Expenses.css";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import ExpenseCharts from "../ExpenseCharts/ExpenseCharts";

function Expenses(): JSX.Element {
    const [expenses,setExpenses] = useState(store.getState().expensesState.expenses);
    const history= useHistory();
    const[filteredYear,setFilteredYear]= useState('2021');
    const[filteredExpenses,setFilteredExpenses] = useState([]);
    const [search,setSearch] = useState('');

  useEffect(() => {
    setFilteredExpenses( expenses.filter((e)=>{
    return e.name.toLowerCase().includes(search.toLowerCase())}));
  },[search,expenses]);

  const saveFilterValue = (selectedDate:any)=>{setFilteredYear(selectedDate)};

  useEffect(() => {
      setFilteredExpenses( expenses.filter((e)=>{
        const start = new Date(e.purchaseDate);
      return start.getFullYear().toString() ===filteredYear}));
  },[expenses,filteredYear]);
  
  useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.user) {
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
                <h3 id="white">you have <span id="numOfItems">{expenses.length}</span> expense(s)</h3>
                <ExpenseFilter onSaveFilterValue={saveFilterValue} selected={filteredYear}/>
                <br />
                <ExpenseCharts expenses={filteredExpenses}/>
                <br />
                <br />
                <Button color="info" onClick={()=>history.push("/user/expense/add")}>➕</Button>
                <br />

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
};

export default Expenses;
