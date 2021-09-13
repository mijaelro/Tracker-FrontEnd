import { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import {  Input } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import store from "../../../../../Redux/Store";
import notify, { ErrMsg } from "../../../../../Services/Notification";
import LinksList from "../LinksList/LinksList";
import "./LinksAdmin.css";

function LinksAdmin(): JSX.Element {

    const history= useHistory();
    const[links,setLinks]= useState(store.getState().linksState.links);
    const[filteredLinks,setFilteredLinks] = useState([]);
    const [search,setSearch] = useState('');


    useEffect(() => {
        setFilteredLinks( links.filter((l)=>{
        return l.name.toLowerCase().includes(search.toLowerCase())}));
    },[search,links]);

    useEffect(() => {
      if (store.getState().authState.client?.clientType!==ClientType.admin) {
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
              <h3 id="white">There are <span id="numOfItems">{links.length}</span> link(s) in the system</h3>
          <div className="shortWidth">
            <Input
              type="text"
              placeholder='Search...'
              spellCheck={false}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>      
          
             <LinksList links={filteredLinks}/>
        </div>
    );
}

export default LinksAdmin;
