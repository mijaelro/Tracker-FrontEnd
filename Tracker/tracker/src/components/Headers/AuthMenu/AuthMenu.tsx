import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import CountDownTimer from "../../../Services/CountDownTimer";
import "./AuthMenu.css";

const AuthMenu = ():JSX.Element=>{
  
  const [client,setClient] = useState(store.getState().authState.client);
  
  useEffect(()=> {
      if(client){
        <CountDownTimer hours={0} minutes={30} seconds={30}/>
      };
        const unsubscribe = store.subscribe(() => {
          setClient(store.getState().authState.client);
      return unsubscribe;
     });
  });

return (
    <div className="AuthMenu">
        {client && (
          <>
            <span id="darkgrey1"> Welcome {client.clientName}</span>
            <span> | </span>
            <NavLink to="/logout" className="normal" activeClassName="active">Logout</NavLink>
          </>
        )}

        {!client && (
          <>
            <span id="darkgrey1">Hello guest</span>
            <span> | </span>
            <NavLink to="/login" activeClassName="active"><span id="pink">Login</span></NavLink>
            <span> | </span>
            <NavLink to="/signup" activeClassName="active"><span id="pink">SignUp</span></NavLink>
          </>
        )}
    </div>
    );
  };

export default AuthMenu;