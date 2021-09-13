import { useHistory } from "react-router";
import { Button, Card, CardHeader } from "reactstrap";
import ExpenseModel from "../../../../../Models/ExpenseModel";
import "./ExpenseCard.css";

interface CardProps{
    expense: ExpenseModel;
};

function ExpenseCard(props:CardProps): JSX.Element {
  const id = props.expense.id;
  const history= useHistory();

return (
  <div className="ExpenseCard customCard">   
		    <Card style={{ width: "13rem",height:"auto" }}  key={id} className="text-center customCard">
            <CardHeader style={{ fontSize: "3rem" }} className="mt-2" id="niceTitle2">
              {props.expense.name}
            </CardHeader>
            <Button color="info" onClick={()=>history.push("/admin/expense/details/" + id)}>⇉</Button>
        </Card>  
  </div>
        
 );
};

export default ExpenseCard;
