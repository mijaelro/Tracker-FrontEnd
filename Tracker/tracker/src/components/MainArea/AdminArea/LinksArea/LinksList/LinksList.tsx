import { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { Button, Container } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import LinkModel from "../../../../../Models/LinkModel";
import { LinkDeletedAction, LinksDownloadedAction } from "../../../../../Redux/LinksState";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import EmptyView from "../../../../SharedArea/EmptyView/EmptyView";
import "./LinksList.css";

interface LinkProps{
  links:LinkModel[]
};

function LinksList(props:LinkProps): JSX.Element {

    const [links,setLinks]= useState(store.getState().linksState.links);
    const history = useHistory();
    
  const fetchLinks = async()=>{
    if(store.getState().linksState.links.length===0){
            const response = await tokenAxios.get<LinkModel[]>(globals.urls.admin+"links")
    if(response.data.length!==0){
            store.dispatch(LinksDownloadedAction(response.data));
            setLinks(response.data); 
            notify.success(SccMsg.DOWNLOADED_LINKS);
    } else{
      return 0;
      };
    };
  };

  const deleteLink =async(id:number)=>{
      const res = window.confirm(
          "Are you sure you want to delete id=" + id + "?"
        );
      if (res) {
        try {
          await tokenAxios.delete<LinkModel>(globals.urls.admin +"link/"+ id);
            store.dispatch(LinkDeletedAction(id));
            notify.success(SccMsg.DELETED_SUCCESS);
        }catch (err) {
            notify.error(err);
        };
      };
  };

  useEffect(()=>{
      if (store.getState().authState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
      try{
        fetchLinks();
      }
      catch(err){
        notify.error(err);
      }
      const unsubscribe = store.subscribe(() => {
        setLinks(store.getState().linksState.links);
      });
      return unsubscribe; 
  });
    
    return (
        <Container>

        <div className="LinksList">
            {links.length===0&&<EmptyView msg="Loading links..."/>}
            <br />  <br />
			
                <table>
                  <thead>
                      <tr>
                        <th>Id</th>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Added</th>
                        <th>
                        Actions{" "}
                        </th>
                      </tr>
                  </thead>
            <tbody>
                {props.links.map((l) => (
                    <tr key={l.id}>
                        <td>{l.id}</td>
                        <td>{l.userId}</td>
                        <td>{l.name}</td>
                        <td>{l.path}</td>
                        <td>{l.added}</td>
                        <td>
                          <Button color="danger" onClick={() => deleteLink(l.id)}>🗑️</Button>
                        </td>
                    </tr>
                ))}

            </tbody>
          </table>
        </div>
      </Container>

    );
}

export default LinksList;
