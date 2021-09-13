import TodoModel from "../../../../../Models/TodoModel";
import {  Button, UncontrolledTooltip,  } from "reactstrap";
import { useHistory } from "react-router";
import "./TodoCard.css";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { useEffect, useState } from "react";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import globals from "../../../../../Services/Globals";
import { TodoDeletedAction } from "../../../../../Redux/TodosState";

interface CardProps{
    todo: TodoModel;
};

function TodoCard(props:CardProps): JSX.Element {
    const history = useHistory();
    const [todos,setTodos] = useState(store.getState().todosState.todos);

    const deleteTodo =async (id:number)=>{
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
        }
    };
    
    useEffect(() => {
        if (store.getState().authState.client?.clientType!==ClientType.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
        const unsubscribe = store.subscribe(() => {
        setTodos(store.getState().todosState.todos);       
        });
        return unsubscribe;
    });
    
    return (
        <div className="TodoCard">
    
            <div className="flex-container">

                    <div className="flex-item"> 
                    <span id="span1">{props.todo.name}</span>  
                    </div>  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
                    <div className="flex-item">
                    <span id="unc1" ><Button color="info" onClick={() =>{
                            history.push('/user/todo/details/'+props.todo.id)}}>
                                ⇉
                            
                        </Button></span>
                        <span id="unc2" ><Button color ="danger" onClick={() =>deleteTodo(props.todo.id)}>🗑️</Button></span>
                        <span id="unc3"><Button color ="" onClick={() =>history.push("/user/todo/edit/" +props.todo.id)}>✏️</Button></span>

                        </div>
                        </div>
                        <UncontrolledTooltip target="#unc1">
                            Todo details
                        </UncontrolledTooltip>

                        <UncontrolledTooltip target="#unc2">
                            Delete Todo
                        </UncontrolledTooltip>

                        <UncontrolledTooltip target="#unc3">
                            Edit Todo
                        </UncontrolledTooltip>

     
        </div>
    );
};

export default TodoCard;
