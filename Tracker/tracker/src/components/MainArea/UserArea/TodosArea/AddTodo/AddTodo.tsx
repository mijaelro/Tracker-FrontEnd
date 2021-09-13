import "./AddTodo.css";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import TodoModel from "../../../../../Models/TodoModel";
import { useHistory } from "react-router";
import store from "../../../../../Redux/Store";
import { TodoAddedAction } from "../.././../../../Redux/TodosState";
import globals from "../../../../../Services/Globals";
import { useEffect, useState } from "react";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";

interface AddTodoProps{
    onCancel:any;
};

function AddTodo(props:AddTodoProps): JSX.Element {

    const [client,setClient]= useState(store.getState().authState.client);
    const[todos,setTodos]=useState(store.getState().todosState.todos);
    const {register,handleSubmit,formState:{errors}} = useForm<TodoModel>({
        mode: "onTouched"
            });
    const history = useHistory(); 

    const send = async (todo:TodoModel)=>{
        try{
            todo.userId = client?.clientId; 
            const response = await tokenAxios.post<TodoModel>(globals.urls.user+"todo",todo);
            console.log(response.data);
            store.dispatch(TodoAddedAction( response.data));
            history.push('/user/todos');
            notify.success(SccMsg.ADDED_TODO);
        } catch (err) {
            notify.error(err); 
        };
    };
    
  useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.user) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
      const unsubscribe = store.subscribe(() => {
        setTodos(store.getState().todosState.todos);
        });
      return unsubscribe; 
    });

    return (
        <div className="AddTodo">
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
            <Card className="card-signup" data-background-color="blue">
            <Form onSubmit={handleSubmit(send)} className="form" method="">
            <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Add Todo</CardTitle>
                </CardHeader>
                <CardBody>

                <InputGroup >
                <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        type="text" 
                        placeholder="Type a title..." 
                        name="name" 
                        {...register("name",{
                            required:true,
                            minLength:2,
                        })}/>
                        <br />
                            {errors.name?.type==='required' && <span id="errors">Missing title</span>}
                            {errors.name?.type==='minLength' && <span id="errors">Title is too short</span>}
                            <br />
                            <br />

                    </InputGroup>
                        <InputGroup >
                        <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i>📅</i>
                      </InputGroupText>
                        </InputGroupAddon>
                    <Input   
                    type="date" 
                    placeholder="Choose a due date..." 
                    name="dueTo" 
                    {...register("dueTo",
                                {
                        required:true,
                        })}/>
                           <br />
                    {errors.dueTo?.type==='required' && <span id="errors">Missing Due date</span>}
                    <br />
                    <br />
                    </InputGroup>

                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input  
                        type="text" 
                        placeholder="Type a Description..." 
                        name="description" 
                        {...register("description",{
                            required:true,
                            minLength:8,
                        })}/>
                            {errors.description?.type==='required' && <span id="errors">Missing description</span>}
                            {errors.description?.type==='minLength' && <span id="errors">description is too short</span>}
                            <br />
                            <br />
                            </InputGroup>
                            </CardBody>
                            <CardFooter className="text-center">
                      <Button
                        className="btn-neutral btn-round"
                        color="info"
                        size="lg"
                        type="submit"
                      >
                        ✔️
                      </Button>
                    </CardFooter>
              </Form>
            </Card>
          </Row>
          <div className="col text-center">
              <Button id="iconBig" onClick={() => history.push("/user/todos")}>↩</Button>
          </div>
      </Container>
     </div>
   </div>
   );
};

export default AddTodo;
