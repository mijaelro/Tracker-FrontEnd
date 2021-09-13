import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Input } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import TodoModel from "../../../../../Models/TodoModel";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import TodosCards from "../TodosCards/TodosCards";
import "./Todos.css";

interface TodoProps{
    todos:TodoModel[];
};

function Todos(props:TodoProps): JSX.Element {
    const history = useHistory();
    const [todos,setTodos] = useState(store.getState().todosState.todos);
    const[filteredTodos,setFilteredTodos] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        setFilteredTodos( todos.filter((t)=>{
        return t.name.toLowerCase().includes(search.toLowerCase())}));
      },[search,todos]);

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
        <div className="Todos section">
			<h1 id="niceTitle">Todo List</h1>
            <h3 id="white">you have <span id="numOfItems">{todos.length}</span> todo(s)</h3>
            <Button color="info" onClick={() =>history.push("/user/todo/add")}>➕</Button> <br />
            <div className="shortWidth">
                <Input
                type="text"
                placeholder='Search...'
                spellCheck={false}
                onChange={(e)=>setSearch(e.target.value)}
                />
            </div>      
            <TodosCards todos={filteredTodos}/>
        </div>
    );
};

export default Todos;
