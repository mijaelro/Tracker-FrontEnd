import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Button, Card, CardHeader,  CardTitle, UncontrolledTooltip } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import ExpenseModel from "../../../../../Models/ExpenseModel";
import { ExpenseDeletedAction } from "../../../../../Redux/ExpensesState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import "./ExpenseDetailsAdmin.css"

interface RouteParam {
    id: string;
  };

interface ExpenseDetailsProps extends RouteComponentProps<RouteParam> { };

const ExpenseDetailsAdmin = (props:ExpenseDetailsProps):JSX.Element=> {
    const id = +props.match.params.id;
    const history = useHistory();
    const [expense,setExpense] = useState(store.getState().expensesState.expenses.find((e) =>e.id === id));
    
    const deleteExpense =async ()=>{
        const res = window.confirm(
          "Are you sure you want to delete id=" + id + "?"
        );
        if (res) {
          try {
            await tokenAxios.delete<ExpenseModel>(globals.urls.admin+"expense/"+id);
            store.dispatch(ExpenseDeletedAction(id));
            notify.success(SccMsg.DELETED_SUCCESS);
            history.push('/admin/expenses');
          }catch (err) {
           notify.error(err);
          };
        };
    }
      
    useEffect(() => {
      if (store.getState().authState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
      };
    });

  return(
      <div className="ExpenseDetailsAdmin section ">
         
          <h1 id="niceTitle">Details</h1>
          
		    <Card style={{ 
            width: "25rem",
            height:"auto",
            margin:"10px",  
            borderWidth:"24px",
            borderStyle:"ridge",
            borderColor:"#2eb9ce"}}  
            key={id} className="customCard">

          <CardHeader style={{ fontSize: "2.5rem" }} className="mt-2" id="niceTitle2">
            {expense?.name}
          </CardHeader>
            
            <CardTitle tag="h4" id="customMargin" >
               
              <span id="pd"> {expense?.description} for {' '}</span> 
              <span id="price"> {expense?.price}$</span> <br /><br />
              <span id="customDate"> {expense?.purchaseDate}</span>

              <UncontrolledTooltip target="#customDate">
                Purchase Date
              </UncontrolledTooltip>
              <br />
            </CardTitle>
            
            <Button className="btn-round" size="small" color="danger" onClick={()=>deleteExpense()}>
              🗑️
            </Button>
  
        </Card>

            <br />
            <Button id="iconBig" onClick={() => history.push("/admin/expenses")}>↩</Button>
        </div>
    ); 
}

export default ExpenseDetailsAdmin;