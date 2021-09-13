import React from "react";
import { useForm } from "react-hook-form";
import {  useHistory } from "react-router-dom";
import CredentialsModel from "../../../../Models/CredentialsModel";
import tokenAxios from "../../../../Services/InterceptorAxois";
import globals from "../../../../Services/Globals";
import store from "../../../../Redux/Store";
import { loginAction } from "../../../../Redux/AuthState";
import notify, { SccMsg } from "../../../../Services/Notification";
import ClientType from "../../../../Models/ClientTypeModel";
import ClientTypeModel from "../../../../Models/ClientTypeModel";
import ClientModel from "../../../../Models/ClientModel";
import "./Login.css";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
  } from "reactstrap";



function Login(): JSX.Element {

    const [emailFocus, setEmailFocus] = React.useState(false);
    const [clientFocus, setClientFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const {register,handleSubmit, formState: { errors}} = useForm<CredentialsModel>({ mode: "onTouched" });
    const history = useHistory();

     
    async function send(credentials: CredentialsModel) {
      try{ 
            const response = await tokenAxios.post<ClientModel>(globals.urls.client+"login",credentials);
            store.dispatch(loginAction(response.data));
            console.log(response.data);
            notify.success(SccMsg.LOGIN_SUCCESS);
        if(response.data.clientType===ClientType.admin){
              history.push('/admin/expenses'); 
          };
        if(response.data.clientType===ClientType.user){
              history.push('/user/expenses'); 
          };
        }
      catch(err){
          notify.error(err);
        };
    };

return (
       
		<div className="Login section section-signup" 
            style={{
            backgroundImage:"url(" + require("../../../../assets/img/bg11.jpg").default + ")",
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
                  <CardTitle className="title-up" tag="h3">Login</CardTitle>
                </CardHeader>
                
                <CardBody>

                  <InputGroup className={"no-border" + (emailFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>

                        <Input
                          placeholder="Email..."
                          name="email"
                          type="email"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                          {...register("email",{
                            required:true,
                            minLength:9,
                          })}
                        />

                     <br />
                         {errors.email?.type==='required' && <span id="errors">Missing email</span>}
                         {errors.email?.type==='minLength' && <span id="errors">email is too short</span>}
                     <br />
                    </InputGroup>

                    <InputGroup
                      className={"no-border" + (passwordFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i>🔑</i>
                        </InputGroupText>
                      </InputGroupAddon>
                        <Input
                          placeholder="Password..."
                          name="password"
                          type="password"
                          onFocus={() => setPasswordFocus(true)}
                          onBlur={() => setPasswordFocus(false)}
                          {...register("password",{
                            required:true,
                            minLength:5
                          })}
                        />

                        <br />
                         {errors.password?.type==='required' && <span id="errors">Missing password</span>}
                         {errors.password?.type==='minLength' && <span id="errors">Password is too short</span>}
                        <br />
                    </InputGroup>

                  <InputGroup className={"no-border" + (clientFocus ? " input-group-focus":"" )}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i>💁</i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input
                          placeholder="ClientType..."
                          type="select"
                          name="clientType"
                          defaultValue="-"
                          onFocus={() => setClientFocus(true)}
                          onBlur={() => setClientFocus(false)}
                          {...register("clientType",{
                            required:true,
                          })}
                        >
                             <option value="-"  disabled >Choose here</option>
                        <option id="dark1" value={ClientTypeModel.admin}>ADMIN</option>
                        <option id="dark1" value={ClientTypeModel.user}>USER</option>
                        </Input>

                        <br />
                        {errors.clientType?.type==='required' && <span id="errors">Missing clientType</span>}
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
          <Button id="iconBig" onClick={() => history.push("/home")}>↩</Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
