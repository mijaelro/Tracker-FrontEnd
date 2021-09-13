import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Container } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import TodoModel from "../../../../../Models/TodoModel";
import store from "../../../../../Redux/Store";
import {  TodoDeletedAction, TodosDownloadedAction } from "../../../../../Redux/TodosState";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import EmptyView from "../../../../SharedArea/EmptyView/EmptyView";
import "./TodosCards.css";

interface TodosProps{
    todos:TodoModel[]
};

function TodosCards(props:TodosProps): JSX.Element {
const[todos,setTodos]=useState(store.getState().todosState.todos);
const history = useHistory();

const fetchTodos = async()=>{
  if(store.getState().todosState.todos.length===0){
      const response = await tokenAxios.get<TodoModel[]>(globals.urls.admin+"todos");
      store.dispatch(TodosDownloadedAction(response.data));
  if(response.data.length!==0){
      setTodos(response.data);
      notify.success(SccMsg.DOWNLOADED_TODOS);
      return response.data;
  }else{
      return 0;
      }; 
  };
};

const deleteTodo =async (id:number)=>{
    const res = window.confirm(
      "Are you sure you want to delete id=" + id + "?"
    );
    if (res) {
      try {
        await tokenAxios.delete<TodoModel>(globals.urls.admin+"todo/"+id);
        store.dispatch(TodoDeletedAction(id));
        notify.success(SccMsg.DELETED_SUCCESS);
        history.push('/admin/todos');
      }catch (err) {
       notify.error(err);
      };
    };
};

useEffect(() => {
  if (store.getState().authState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
  };
  try{
        fetchTodos();
  }catch(err){
        notify.error(err);
  }
    const unsubscribe = store.subscribe(() => {
        setTodos(store.getState().todosState.todos);
    });
  return unsubscribe;
});

    return (
        <Container  className="TodosCards">
            {todos.length===0&&<EmptyView msg="Loading todo's..."/>}
            <br />  <br />
            {todos.length!==0&&(
              <>            
                <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due to</th>
                        <th>
                          Actions{" "}
                        </th>
                    </tr>
                </thead>
            <tbody>
              {props.todos.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.userId}</td>
                  <td>{t.name}</td>
                  <td>{t.description}</td>
                  <td>{t.dueTo}</td>
                  <td>
                      <Button color="danger" onClick={() => deleteTodo(t.id)}>🗑️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>          
            </>
        )}
      </Container>
    );
}

export default TodosCards;
