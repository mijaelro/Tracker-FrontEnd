import { useEffect, useState } from "react";
import ExpenseModel from "../../../../../Models/ExpenseModel";
import {  ExpensesDownloadedAction } from "../../../../../Redux/ExpensesState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import notify, {  SccMsg } from "../../../../../Services/Notification";
import "./ExpensesCards.css";
import {  Container } from "reactstrap";
import { useHistory } from "react-router";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import EmptyView from "../../../../SharedArea/EmptyView/EmptyView";

interface ExpenseListProps{
  expenses:ExpenseModel[]
};

function ExpensesCards(props:ExpenseListProps): JSX.Element {

  const[expenses,setExpenses]= useState(store.getState().expensesState.expenses);
  const [count,setCount]=useState(store.getState().expensesState.expenses.length);
  const history = useHistory();


  const fetchExpenses = async () => {
    if (store.getState().expensesState.expenses.length === 0) {
        const response = await tokenAxios.get<ExpenseModel[]>(globals.urls.admin+"expenses");
        store.dispatch(ExpensesDownloadedAction(response.data));
    if(response.data.length!==0){
        setExpenses(response.data);
        notify.success(SccMsg.DOWNLOADED_EXPENSES);
      return response.data;
    }
    else{
      return 0; 
     };
    };
  };


  useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.admin) {
      history.push("/login");
    };
    try{
      fetchExpenses();
    }
    catch(err){
      notify.error(err);
    };
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().expensesState.expenses.length);
    });
    return unsubscribe;
  });
            
return (
    <Container className="ExpensesCards">

            {count===0&&<EmptyView msg="Loading expenses!"/>}
                <br />  <br />
            {count!==0&&( 
              <>
                {props.expenses.map((expense)=>
                <ExpenseCard key={expense.id} expense={expense}/> 
                )}
              </>
            )}
  
    </Container>
 );
}

export default ExpensesCards;


