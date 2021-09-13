import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText,  Row } from "reactstrap";
import {  useHistory } from "react-router";
import { useEffect, useState } from "react";
import store from "../../../../../Redux/Store";
import { useForm } from "react-hook-form";
import globals from "../../../../../Services/Globals";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import UserModel from "../../../../../Models/UserModel";
import { UserAddedAction } from "../../../../../Redux/UserState";
import "./AddUser.css";

function AddUser(): JSX.Element {
  
  const {register,handleSubmit,formState:{errors}} = useForm<UserModel>();
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const history = useHistory();

  async function send(user:UserModel) {
        try{
            const response = await tokenAxios.post<UserModel>(globals.urls.admin+"user",user);
            store.dispatch(UserAddedAction(response.data));
            history.push('/admin/users');
            notify.success(SccMsg.ADDED_USER);
        }
        catch (err) {
          notify.error(err);
        };
    };

    useEffect(() => {
      if (store.getState().authState.client?.clientType!==ClientType.admin) {
          notify.error(ErrMsg.PLS_LOGIN);
          history.push("/login");
      };
    });
    
    return (
      <div className="AddLink">
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
          <>
            <Card className="card-signup" data-background-color="blue">
              <Form className="form" onSubmit={handleSubmit(send)} >
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Add User</CardTitle>
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
                          {...register("firstName",{
                                minLength:2,
                                required:true
                          })}
                        />   
                        {errors.firstName?.type==='minLength' && <span id="errors">FirstName is too short</span>}
                        {errors.firstName?.type==='required' && <span id="errors">FirstName is missing</span>}
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
                          {...register("lastName",{
                            minLength:2,
                            required:true
                          })}
                        />
                        <br />
                        {errors.lastName?.type==='minLength' && <span id="errors">LastName is too short</span>}
                        {errors.lastName?.type==='required' && <span id="errors">LastName is missing</span>}
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
                            {...register("email",{
                              minLength:2,
                              required:true
                            })}
                            />
                          <br />
                          {errors.email?.type==='minLength' && <span id="errors">Email is to short </span>}
                          {errors.email?.type==='required' && <span id="errors">Email is missing </span>}
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
                            {...register("password",{
                              minLength:9,
                              required:true
                            })}
                            />
                          <br />
                          {errors.password?.type==='minLength' && <span id="errors">Password is to short </span>}
                          {errors.password?.type==='required' && <span id="errors">Password is missing </span>}
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
                    </CardFooter>
              </Form>
            </Card>
          </>
        </Row>
      <div className="col text-center">
        <Button id="iconBig" onClick={() => history.push("/admin/users")}>↩</Button>
      </div>
     </Container>
    </div>
   </div>
  );
};

export default AddUser;
