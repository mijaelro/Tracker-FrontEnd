import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Button, Card,  CardHeader,  CardTitle,  UncontrolledTooltip } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import TodoModel from "../../../../../Models/TodoModel";
import store from "../../../../../Redux/Store";
import { TodoDeletedAction } from "../../../../../Redux/TodosState";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import "./TodoDetails.css"

interface RouteParam {
    id: string;
  };

interface TodoDetailsProps extends RouteComponentProps<RouteParam> { };

const TodoDetails = (props:TodoDetailsProps):JSX.Element=> {

    const id = +props.match.params.id;
    const history = useHistory();
    const [todo,setTodo] = useState(store.getState().todosState.todos.find((t) =>t.id === id));
   
    const deleteTodo =async ()=>{
        const res = window.confirm(
          "Are you sure you want to delete id=" + id + "?"
        );
        if (res) {
          try {
            await tokenAxios.delete<TodoModel>(globals.urls.user+"todo/"+id);
            store.dispatch(TodoDeletedAction(id));
            notify.success(SccMsg.DELETED_SUCCESS);
            history.push('/user/todos');
          }catch (err) {
           notify.error(err);
          };
        };
    };
      
    useEffect(() => {
      if (store.getState().authState.client?.clientType!==ClientType.user) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
      };
    });

    return(
        <div className="TodoDetails section">
          <h1 id="niceTitle">Details</h1>
          <Card style={{ 
              width: "25rem",
              height:"auto",
              margin:"10px",  
              borderWidth:"24px",
              borderStyle:"ridge",
              borderColor:"#2eb9ce"}}  
              key={id} className="customCard5">
          <CardHeader style={{ fontSize: "2.5rem" }} className="mt-2" id="niceTitle2">{todo?.name}</CardHeader>
           
              <CardTitle tag="h4" id="customMargin" >
              
              <span id="pd"> {todo?.description}</span> <br /><br />
              <span id="customDate"> {todo?.dueTo}</span>
                
              <UncontrolledTooltip target="#customDate">
                DueTo Date
            </UncontrolledTooltip>

            <br />
            </CardTitle>
            <Button color="danger" onClick={()=>deleteTodo()}>🗑️</Button>

        </Card>
        <br />
        <Button id="iconBig" onClick={() => history.push("/user/todos")}>↩</Button>

        </div>
    );
    
};

export default TodoDetails;