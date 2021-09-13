import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Input } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import TodosList from "../TodosCards/TodosCards";
import "./TodosAdmin.css";

function TodosAdmin(): JSX.Element {

    const history = useHistory();
    const [todos,setTodos] = useState(store.getState().todosState.todos);
    const[filteredTodos,setFilteredTodos] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        setFilteredTodos( todos.filter((t)=>{
        return t.name.toLowerCase().includes(search.toLowerCase())}));
    },[search,todos]);

    useEffect(() => {
        if (store.getState().authState.client?.clientType!==ClientType.admin) {
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
            <h3 id="white">There are  <span id="numOfItems">{todos.length}</span> todo(s) in the system</h3>
            <div className="shortWidth">
            <Input
              type="text"
              placeholder='Search...'
              spellCheck={false}
              onChange={(e)=>setSearch(e.target.value)}
            />
            </div>      
            <TodosList todos={filteredTodos}/>
        </div>
    );
}

export default TodosAdmin;
