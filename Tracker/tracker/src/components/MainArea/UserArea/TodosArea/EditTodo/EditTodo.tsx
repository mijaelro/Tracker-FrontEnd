import "./EditTodo.css";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText,  Row } from "reactstrap";
import { RouteComponentProps, useHistory } from "react-router";
import { useEffect, useState } from "react";
import store from "../../../../../Redux/Store";
import { useForm } from "react-hook-form";
import globals from "../../../../../Services/Globals";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import TodoModel from "../../../../../Models/TodoModel";
import { TodoUpdatedAction } from "../../../../../Redux/TodosState";

interface RouteParam {
    id: string;
  };
  
interface TodoDetailsProps extends RouteComponentProps<RouteParam> {};

function EditTodo(props:TodoDetailsProps): JSX.Element {

    const id = +props.match.params.id;
    const[client,setClient] = useState(store.getState().authState.client);
    const[todos,setTodos]=useState(store.getState().todosState.todos);
    const [todo,setTodo] = useState(store.getState().todosState.todos.find((l) => l.id === id));
    const {register,handleSubmit,formState:{errors}} = useForm<TodoModel>({
        mode: "onTouched"
            });

    const [nameFocus, setNameFocus] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);
    const [dueToFocus, setDueToFocus] = useState(false);
    
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const history = useHistory();


    const handleName = (e: { target: { value: string; }; }) =>{
        setName(e.target.value);
        return name; 
    };

    const handleDescription = (e: { target: { value: string; }; }) =>{
        setDescription(e.target.value);
        return description; 
    };

    const editTodo= async (todo:TodoModel) => {
        try {
          todo.userId = client?.clientId;
          todo.id = id; 
          const response =await tokenAxios.put<TodoModel>(globals.urls.user+"todo",todo);
          store.dispatch(TodoUpdatedAction( response.data));
          setTodo( response.data);
          notify.success(SccMsg.UPDATED_SUCCESS);  
          history.push('/user/todos'); 
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
            setTodos(store.getState().todosState.todos);    
        });
        return unsubscribe;
      });

    return (
      <div className="EditTodo">
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
			    {todo && (
          <>
            <Card className="card-signup" data-background-color="blue">
              <Form className="form" onSubmit={handleSubmit(editTodo)} >
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Edit Todo</CardTitle>
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
                          defaultValue ={todo?.name}
                          onChange={()=>handleName}
                          {...register("name",{
                                minLength:2,
                          })}
                        />   
                        {errors.name?.type==='minLength' && <span id="errors">Name is too short</span>}
                        <br />
                </InputGroup>


                <InputGroup
                    className={"no-border" + (descriptionFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i>💬</i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input 
                          placeholder="Description..."
                          type="text"
                          name="description"
                          onFocus={() => setDescriptionFocus(true)}
                          onBlur={() => setDescriptionFocus(false)} 
                          defaultValue ={todo?.description}
                          onChange={()=>handleDescription}
                          {...register("description",{
                            minLength:12,
                          })}
                        />
                        <br />
                        {errors.description?.type==='minLength' && <span id="errors">description is too short</span>}
                </InputGroup>


                <InputGroup className={"no-border" + (dueToFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i>📅</i>
                      </InputGroupText>
                    </InputGroupAddon>
                          <Input 
                          //check a way to set the dates default value
                            placeholder="Due to..."
                            type="date"  
                            name="dueTo" 
                            onFocus={() => setDueToFocus(true)}
                            onBlur={() => setDueToFocus(false)}
                            defaultValue={todo?.dueTo.toString()}
                            {...register("dueTo",{
                            })}
                            />
                          <br />
                          {errors.dueTo?.type==='required' && <span id="errors">Missing dueTo date</span>}
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
                      
                      <br />
                      <span><span id="errors">note <br /></span>to edit you have to click in every single box even tho you dont want to edit it </span>

                </CardFooter>
              </Form>
            </Card>
          </>
          )}
        </Row>
                  <div className="col text-center">
                    <Button id="iconBig" onClick={() => history.push("/user/todos")}>↩</Button>
                  </div>
      </Container>
    </div>
   </div>
  );
};

export default EditTodo;
