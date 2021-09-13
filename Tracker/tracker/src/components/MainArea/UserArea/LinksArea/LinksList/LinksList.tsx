import { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { Button, Container, Input } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import LinkModel from "../../../../../Models/LinkModel";
import { LinkDeletedAction, LinksDownloadedAction } from "../../../../../Redux/LinksState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import EmptyView from "../../../../SharedArea/EmptyView/EmptyView";
import "./LinksList.css";

function LinksList(): JSX.Element {
    const [links,setLinks]= useState(store.getState().linksState.links);
    const [count,setCount] =  useState(store.getState().linksState.links.length);
    const history = useHistory();
    const[filteredLinks,setFilteredLinks]=useState([]);
    const [search,setSearch] = useState('');
    
    useEffect(() => {
      setFilteredLinks( links.filter((l)=>{
      return l.name.toLowerCase().includes(search.toLowerCase())}));
    },[search,links]);

    const fetchLinks = async()=>{
        if(store.getState().linksState.links.length===0){
                const response = await tokenAxios.get<LinkModel[]>(globals.urls.user+"links")
                if(response.data.length!==0){
                    store.dispatch(LinksDownloadedAction(response.data));
                    setLinks(response.data); 
                    notify.success(SccMsg.DOWNLOADED_LINKS);
                } else{
                  return setCount(-1); 
                };
         };
    };

    const deleteLink =async(id:number)=>{
        const res = window.confirm(
            "Are you sure you want to delete id=" + id + "?"
          );
          if (res) {
            try {
            await tokenAxios.delete<LinkModel>(globals.urls.user +"link/"+ id);
              store.dispatch(LinkDeletedAction(id));
              notify.success(SccMsg.DELETED_SUCCESS);
            } catch (err) {
              notify.error(err);
            };
        };
    };

    useEffect(()=>{
      if (store.getState().authState.client?.clientType!==ClientType.user) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
      };
        try{
        fetchLinks();
        }
        catch(err){
            notify.error(err);
        };
        const unsubscribe = store.subscribe(() => {
            setLinks(store.getState().linksState.links);
        });
        return unsubscribe; 
    });
    
    return (
        <Container>

        <div className="LinksList">
        <div className="shortWidth">
          <Input
            type="text"
            placeholder='Search...'
            spellCheck={false}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>  
        {count===-1 &&<h1 id="white">You should add some links</h1>}

            {count===0&&<EmptyView msg="Loading links..."/>}
            <br />  <br />
            
			      <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Added</th>
                        <th>
                            Actions{" "}
                        </th>
                    </tr>
                </thead>
            <tbody>
              {filteredLinks.map((l) => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>{l.name}</td>
                  <td>{l.path}</td>
                  <td>{l.added}</td>
                  <td>
                    <Button color="danger" onClick={() => deleteLink(l.id)}>🗑️</Button>
                    <Button color="yellow" onClick={() => history.push("/user/link/edit/" +l.id)}>✏️</Button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

    );
};

export default LinksList;
