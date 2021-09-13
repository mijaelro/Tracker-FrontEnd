import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Input } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import UserCardsAdmin from "../UsersCardsAdmin/UserCardsAdmin";
import "./UsersAdmin.css";

function UsersAdmin(): JSX.Element {
    const history = useHistory();
    const [users,setUsers] = useState(store.getState().usersState.users);
    const [search,setSearch] = useState('');
    const [filteredUsers,setFilteredUsers] = useState([]);

    useEffect(() => {
        setFilteredUsers( users.filter((u)=>{
        return u.firstName.toLowerCase().includes(search.toLowerCase())}));
      },[search,users]);

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
        <div className="Todos section">
			<h1 id="niceTitle">Users</h1>
            <h3 id="white">There are  <span id="numOfItems">{users.length}</span> user(s) in the system</h3>
            <Button color="info" onClick={() =>history.push("/admin/user/add")}>➕</Button> <br />
            <div className="shortWidth">
            <Input
              type="text"
              placeholder='Search...'
              spellCheck={false}
              onChange={(e)=>setSearch(e.target.value)}
            />
            </div>

            <UserCardsAdmin users={filteredUsers}/>
        </div>
    );
};

export default UsersAdmin;
