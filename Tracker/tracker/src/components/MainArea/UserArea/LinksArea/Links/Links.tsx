import { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import LinksList from "../LinksList/LinksList";
import "./Links.css";

function Links(): JSX.Element {
    const [search,setSearch] = useState('');
    const history= useHistory();
    const[filteredLinks,setFilteredLinks]=useState([]);
    const[links,setLinks]= useState(store.getState().linksState.links);

    useEffect(() => {
        setFilteredLinks( links.filter((l)=>{
        return l.name.toLowerCase().includes(search.toLowerCase())}));
      },[search,links]);

    useEffect(() => {
        if (store.getState().authState.client?.clientType!==ClientType.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
        const unsubscribe = store.subscribe(() => {
            setLinks(store.getState().linksState.links);
        });
        return unsubscribe;
      });

    return (
        <div className="Links section">
			 <h1 id="niceTitle">Links</h1>
             <h3 id="white">you have <span id="numOfItems">{links.length}</span> link(s)</h3>
            
             <Button  onClick={()=>history.push("/user/link/add")}>➕</Button>
                    
             <LinksList/>
        </div>
    );
};

export default Links;
