import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import { RouteComponentProps, useHistory } from "react-router";
import { useEffect, useState } from "react";
import store from "../../../../../Redux/Store";
import { useForm } from "react-hook-form";
import LinkModel from "../../../../../Models/LinkModel";
import globals from "../../../../../Services/Globals";
import { LinkDeletedAction, LinkUpdatedAction } from "../../../../../Redux/LinksState";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import "./EditLink.css";


interface RouteParam {
    id: string;
};
  
interface LinkDetailsProps extends RouteComponentProps<RouteParam> {};

function EditLink(props:LinkDetailsProps): JSX.Element {

    const id = +props.match.params.id;
    const[client,setClient] = useState(store.getState().authState.client);
    const[links,setLinks]=useState(store.getState().linksState.links);
    const [link,setLink] = useState(store.getState().linksState.links.find((l) => l.id === id));
    const {register,handleSubmit,formState:{errors }} = useForm<LinkModel>({
        mode: "onTouched"
            });

    const [nameFocus, setNameFocus] = useState(false);
    const [pathFocus, setPathFocus] = useState(false);
    const [addedFocus, setAddedFocus] = useState(false);
    
    const[name,setName]=useState('')
    // const[added,setAdded=useState('')
    const[path,setPath]=useState('')
    const history = useHistory();

    const deleteLink =async(id:number)=>{
      const res = window.confirm(
          "Are you sure you want to delete id=" + id + "?"
        );
        if (res) {
      try {
          await tokenAxios.delete<LinkModel>(globals.urls.user +"link/"+ id);
            store.dispatch(LinkDeletedAction(id));
            notify.success(SccMsg.DELETED_SUCCESS);
            history.push('/user/links'); 
      } catch (err) {
            notify.error(err);
          };
      };
    };

    const handleName = (e: { target: { value: string; }; }) =>{
        setName(e.target.value);
        return name; 
    };

    const handlePath = (e: { target: { value: string; }; }) =>{
        setPath(e.target.value);
        return path; 
    };

    const editLink = async (link:LinkModel) => {
        try {
          link.userId = client?.clientId;
          link.id = id; 
          const response =await tokenAxios.put<LinkModel>(globals.urls.user+"link",link);
          store.dispatch(LinkUpdatedAction( response.data));
          setLink( response.data);
          notify.success(SccMsg.UPDATED_SUCCESS);  
          history.push('/user/links'); 
        }catch (err) {
          notify.error(err);
        };
      };

    useEffect(() => {
        if (store.getState().authState.client?.clientType!==ClientType.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
          const unsubscribe = store.subscribe(()=>{
            setLinks(store.getState().linksState.links);    
        });
        return unsubscribe;
      });

    return (
      <div className="EditLink">
        <div className="section section-signup" 
            style={{
            backgroundImage:"url(" + require("../../../../../assets/img/bg11.jpg").default + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            minHeight: "700px",
            }}
            >
          <Container>
            <Row>
            {link && (
            <>
              <Card className="card-signup" data-background-color="blue">
                <Form className="form" onSubmit={handleSubmit(editLink)} >
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h3" id="niceTitle3">Edit Link</CardTitle>
                  </CardHeader>

                  <CardBody>
                    <InputGroup className={"no-border" + (nameFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                          <Input
                            placeholder="Name..."
                            type="text"   
                            name="name" 
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                            defaultValue ={link?.name}
                            onChange={()=>handleName}
                            {...register("name",{
                                  minLength:2,
                            })}
                          />   
                          {errors.name?.type==='minLength' && <span id="errors">Name is too short</span>}
                          <br />
                  </InputGroup>


                  <InputGroup
                      className={"no-border" + (pathFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i>🔗</i>
                        </InputGroupText>
                      </InputGroupAddon>
                          <Input 
                            placeholder="Path..."
                            type="text"
                            name="path"
                            onFocus={() => setPathFocus(true)}
                            onBlur={() => setPathFocus(false)} 
                            defaultValue ={link?.path}
                            onChange={()=>handlePath}
                            {...register("path",{
                              minLength:12,
                            })}
                          />
                          <br />
                          {errors.path?.type==='minLength' && <span id="errors">path is too short</span>}
                  </InputGroup>


                  <InputGroup className={"no-border" + (addedFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i>📅</i>
                        </InputGroupText>
                      </InputGroupAddon>
                            <Input 
                            //check a way to set the dates default value
                              placeholder="Added the..."
                              type="date"  
                              name="added" 
                              onFocus={() => setAddedFocus(true)}
                              onBlur={() => setAddedFocus(false)}
                              defaultValue={link?.added.toString()}
                              {...register("added",{
                                    required:true,
                              })}
                              />
                            <br />
                            {errors.added?.type==='required' && <span id="errors">Missing added date</span>}
                            <br />
                      </InputGroup>

                   </CardBody>

                <CardFooter className="text-center">
                      <Button
                        className="btn-neutral btn-round"
                        color="info"
                        size="small"
                        type="submit"
                      >
                        ✔️
                      </Button>
                      <Button  className="btn-neutral btn-round"
                        color="info"
                        size="small" onClick={() => deleteLink(id)}>🗑️</Button>

                      <br />
                      <span><span id="errors">note <br /></span>to edit you have to click in every single box even tho you dont want to edit it </span>

                </CardFooter>
              </Form>
            </Card>
          </>
          )}
        </Row>
                  <div className="col text-center">
                    <Button id="iconBig" onClick={() => history.push("/user/links")}>↩</Button>                   
                  </div>
       </Container>
     </div>
   </div>
  );
};

export default EditLink;
