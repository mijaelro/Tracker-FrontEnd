import { useEffect,  useState } from "react";
import {  useHistory } from "react-router";
import {  Container } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import TodoModel from "../../../../../Models/TodoModel";
import store from "../../../../../Redux/Store";
import {   TodosDownloadedAction } from "../../../../../Redux/TodosState";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import EmptyView from "../../../../SharedArea/EmptyView/EmptyView";
import "./TodosCards.css";
import TodoCard from "../TodoCard/TodoCard";

interface TodoProps { 
  todos:TodoModel[];
};

function TodosCards(props:TodoProps): JSX.Element {

const[todos,setTodos]=useState(store.getState().todosState.todos);
const [count,setCount]=useState(store.getState().todosState.todos.length);
const history = useHistory();

const fetchTodos = async()=>{
    if(store.getState().todosState.todos.length===0){
        const response = await tokenAxios.get<TodoModel[]>(globals.urls.user+"todos");
        store.dispatch(TodosDownloadedAction(response.data));
    if(response.data.length!==0){
        setTodos(response.data);
        notify.success(SccMsg.DOWNLOADED_TODOS);
        return response.data;
    }else{
        return setCount(-1);
        };
    };
};


useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.user) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
    try{
        fetchTodos();
    }catch(err){
        notify.error(err);
    }
    const unsubscribe = store.subscribe(() => {
        setCount(store.getState().todosState.todos.length);
    });
    return unsubscribe;
});

return (
    <Container  className="TodosCards">
            {count===-1 &&<h1 id="white">You should add some todo's</h1>}
            {count===0&&<EmptyView msg="Loading todo's..."/>}
            <br />  <br />

        <div className="cont12" id="myDiv">
            <h1 id="niceTit">My To-Do List</h1>
            <div >
              <ul id="myUL">
                {props.todos.map((t) => (
                  <>
                   <li key={t.id}>
                   <TodoCard  todo={t}/>
                   </li>
                </>
                ))}
              </ul>
            </div>

        </div>
                    
    </Container>

    );
};

export default TodosCards;


