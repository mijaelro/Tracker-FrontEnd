import {  Button  } from "reactstrap";
import { useHistory } from "react-router";
import "./UserCardAdmin.css";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import { useEffect, useState } from "react";
import ClientType from "../../../../../Models/ClientTypeModel";
import UserModel from "../../../../../Models/UserModel";

interface CardProps{
    user: UserModel;
};

function UserCardAdmin(props:CardProps): JSX.Element {
    
    const history = useHistory();
    const id = props.user.id;
    const [users,setUsers] = useState(store.getState().usersState.users);

    
    useEffect(() => {
        if (store.getState().authState.client?.clientType!==ClientType.admin) {
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
        const unsubscribe = store.subscribe(() => {
        setUsers(store.getState().usersState.users);       
        });
        return unsubscribe;
    });
       
    return (
        <div className="UserCardAdmin customCard4">

          <div className="flexDiv">
            <span className="flexDivCh" id="customId">{props.user.id} <br/></span> 
            <span className="flexDivCh"> {props.user.firstName} {props.user.lastName}</span> 
            <span className="flexDivCh"> 
                <Button color="info" onClick={()=>history.push("/admin/user/details/" + id)}>⇉</Button>
            </span> 
          </div>

        </div>
    );
};

export default UserCardAdmin;
