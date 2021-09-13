import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {  Container } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import UserModel from "../../../../../Models/UserModel";
import store from "../../../../../Redux/Store";
import { UsersDownloadedAction } from "../../../../../Redux/UserState";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import EmptyView from "../../../../SharedArea/EmptyView/EmptyView";
import UserCardAdmin from "../UserCardAdmin/UserCardAdmin";
import "./UserCardsAdmin.css";

interface UserProps{
    users:UserModel[]
};

function UserCardsAdmin(props:UserProps): JSX.Element {

    const [users,setUsers] = useState(store.getState().usersState.users);
    const [count,setCount]=useState(store.getState().usersState.users.length);
    const history = useHistory();



const fetchUsers = async()=>{
    if(count===0){
        const response = await tokenAxios.get<UserModel[]>(globals.urls.admin+"users");
        store.dispatch(UsersDownloadedAction(response.data));
    if(response.data.length!==0){
        setUsers(response.data);
        notify.success(SccMsg.DOWNLOADED_USERS);
        return response.data;
    }else{
        return 0;
    };
  };
};


useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
    try{
        fetchUsers();
    }catch(err){
        notify.error(err);
    }
    const unsubscribe = store.subscribe(() => {
        setCount(store.getState().usersState.users.length);
    });
    return unsubscribe;
});

    return (
        <Container  className="TodosCards">
            {count===0&&<EmptyView msg="Loading todo's..."/>}
            <br />  <br />
            {count!==0&&(
                <>              
                    {props.users.map((u)=>
                     <UserCardAdmin key={u.id} user={u} />
                    )}
                </>
            )}
        </Container>
    );
};

export default UserCardsAdmin;
