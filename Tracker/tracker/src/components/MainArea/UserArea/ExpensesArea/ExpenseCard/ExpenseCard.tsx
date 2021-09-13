import { useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Card, CardHeader, CardTitle, UncontrolledTooltip } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import ExpenseModel from "../../../../../Models/ExpenseModel";
import "./ExpenseCard.css";

interface CardProps{
    expense: ExpenseModel;
};

function ExpenseCard(props:CardProps): JSX.Element {

  const id = props.expense.id;
  const history= useHistory();
  
  useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.user) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
  });

return (
  <div className="ExpenseCard customCard">
		    <Card style={{ width: "15rem",height:"auto",margin:"0px" }}  key={id} className="text-center customCard">
          <CardHeader style={{ fontSize: "1.5rem" }} className="mt-2" id="niceTitle2">{props.expense.name}</CardHeader>
              <CardTitle tag="h4" id="customMargin" >
               
              <span id="pd"> {props.expense.description} for {' '}</span> 
              <span id="price"> {props.expense.price}$</span> <br />
              <span id="customDate"> {props.expense.purchaseDate}</span>
            <UncontrolledTooltip target="#customDate">
             Purchase Date
            </UncontrolledTooltip>
              <br />
            </CardTitle>
            <Button  
                className="btn-round"
                size="small" onClick={()=>history.push("/user/expense/edit/" + id)}>
              ✏️
            </Button>
        </Card>  
  </div>      
 );
};

export default ExpenseCard;
