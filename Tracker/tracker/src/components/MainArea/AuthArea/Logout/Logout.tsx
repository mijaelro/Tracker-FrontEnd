import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../../../Redux/AuthState";
import { ExpensesClearedAction } from "../../../../Redux/ExpensesState";
import { LinksClearedAction } from "../../../../Redux/LinksState";
import store from "../../../../Redux/Store";
import { TodosClearedAction } from "../../../../Redux/TodosState";
import globals from "../../../../Services/Globals";
import tokenAxios from "../../../../Services/InterceptorAxois";
import notify, { SccMsg } from "../../../../Services/Notification";

function Logout(): JSX.Element {
  const history = useHistory();

  const logOut = async()=>{
    await tokenAxios.delete(globals.urls.client+"logout");
    store.dispatch(logoutAction());
    history.push("/home");
    notify.success(SccMsg.LOGOUT_SUCCESS);
  }

   useEffect(()=>{
      store.dispatch(ExpensesClearedAction());
      store.dispatch(LinksClearedAction());
      store.dispatch(TodosClearedAction());
      try{
        logOut();
      }
      catch (err) {
       notify.error(err);
      }
    });
    
return (
  <></>
 );
};

export default Logout;