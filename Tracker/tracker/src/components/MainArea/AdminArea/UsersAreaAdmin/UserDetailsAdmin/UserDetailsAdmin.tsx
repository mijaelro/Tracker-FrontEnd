import { Button, Card, CardBody, CardFooter, CardHeader,  CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText,  Row } from "reactstrap";
import ClientType from "../../../../../Models/ClientTypeModel";
import UserModel from "../../../../../Models/UserModel";
import store from "../../../../../Redux/Store";
import { UserDeletedAction, UserUpdatedAction } from "../../../../../Redux/UserState";
import globals from "../../../../../Services/Globals";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import "./UserDetailsAdmin.css"

interface RouteParam {
    id: string;
  };

interface UserDetailsProps extends RouteComponentProps<RouteParam> { };

const UserDetailsAdmin = (props:UserDetailsProps):JSX.Element=> {

    const id = +props.match.params.id;
    const history = useHistory();
    const [user,setUser] = useState(store.getState().usersState.users.find((u) =>u.id === id));
    const {register,handleSubmit,formState:{errors}} = useForm<UserModel>();
    
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
          
    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
      
    const handleFirstName = (e: { target: { value: string; }; }) =>{
      setFirstName(e.target.value);
    return firstName; 
    };

    const handleLastName = (e: { target: { value: string; }; }) =>{
      setLastName(e.target.value);
    return lastName; 
    };

    const handleEmail = (e: { target: { value: string; }; }) =>{
      setEmail(e.target.value);
    return email; 
    };

    const handlePassword = (e: { target: { value: string; }; }) =>{
      setPassword(e.target.value);
    return password; 
    };

    const deleteUser =async ()=>{
      const res = window.confirm(
          "Are you sure you want to delete id=" + id + "?"
      );
      if (res) {
        try {
            await tokenAxios.delete<UserModel>(globals.urls.admin+"user/"+id);
            store.dispatch(UserDeletedAction(id));
            notify.success(SccMsg.DELETED_SUCCESS);
            history.push('/admin/users');
        }catch (err) {
           notify.error(err);
        };
      };
    };
      
    const editUser = async (user:UserModel) => {
      try {
        user.id = id; 
        const response =await tokenAxios.put<UserModel>(globals.urls.admin+"user",user);
        store.dispatch(UserUpdatedAction( response.data));
        setUser( response.data);
        notify.success(SccMsg.UPDATED_SUCCESS);  
        history.push('/admin/users'); 
      }catch (err) {
        notify.error(err);
      };
    };

    useEffect(() => {
      if (store.getState().authState.client?.clientType!==ClientType.admin) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
      };
    });

    return(
        <div className="UserDetailsAdmin ">
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
			    {user && (
          <>
            <Card className="card-signup" data-background-color="blue">
              <Form className="form" onSubmit={handleSubmit(editUser)} >
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Edit User</CardTitle>
                </CardHeader>

                <CardBody>
                  <InputGroup className={"no-border" + (firstNameFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                  </InputGroupAddon>
                        <Input
                          placeholder="FirstName..."
                          type="text"   
                          name="firstName" 
                          onFocus={() => setFirstNameFocus(true)}
                          onBlur={() => setFirstNameFocus(false)}
                          defaultValue ={user?.firstName}
                          onChange={()=>handleFirstName}
                          {...register("firstName",{
                                minLength:2,
                                required:false
                          })}
                        />   
                        {errors.firstName?.type==='minLength' && <span id="errors">FirstName is too short</span>}
                        <br />
                  </InputGroup>


                  <InputGroup
                    className={"no-border" + (lastNameFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input 
                          placeholder="LastName..."
                          type="text"
                          name="lastName"
                          onFocus={() => setLastNameFocus(true)}
                          onBlur={() => setLastNameFocus(false)} 
                          defaultValue ={user?.lastName}
                          onChange={()=>handleLastName}

                          {...register("lastName",{
                            minLength:2,
                            required:false
                          })}
                        />
                        <br />
                        {errors.lastName?.type==='minLength' && <span id="errors">LastName is too short</span>}
                  </InputGroup>


                  <InputGroup className={"no-border" + (emailFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                          <Input 
                            placeholder="Email..."
                            type="email"  
                            name="email" 
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            onChange={()=>handleEmail}
                            defaultValue ={user?.email}
                            {...register("email",{
                              minLength:2,
                              required:false
                            })}
                            />
                          <br />
                          {errors.email?.type==='minLength' && <span id="errors">Email is to short </span>}
                          <br />
                    </InputGroup>


                    <InputGroup className={"no-border" + (passwordFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                          <Input 
                            placeholder="Password..."
                            type="password"  
                            name="password" 
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            onChange={()=>handlePassword}
                            value ={user?.password}
                            {...register("password",{
                              minLength:5,
                              required:false
                            })}
                            />
                          <br />
                          {errors.password?.type==='minLength' && <span id="errors">Password is to short </span>}
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
                      <Button
                        className="btn-neutral btn-round"
                        color="info"
                        size="small"
                        onClick={() =>deleteUser()}
                      >
                        🗑️
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
              <Button id="iconBig" onClick={() => history.push("/admin/users")}>↩</Button>
            </div>
      </Container>
    </div>
   </div>
  );
};

export default UserDetailsAdmin;