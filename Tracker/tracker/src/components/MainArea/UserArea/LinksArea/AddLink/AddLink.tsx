import "./AddLink.css";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText,  Row } from "reactstrap";
import {  useHistory } from "react-router";
import { useEffect, useState } from "react";
import store from "../../../../../Redux/Store";
import { useForm } from "react-hook-form";
import LinkModel from "../../../../../Models/LinkModel";
import globals from "../../../../../Services/Globals";
import { LinkAddedAction } from "../../../../../Redux/LinksState";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";

function AddLink(): JSX.Element {
    
  const {register,handleSubmit,formState:{errors}} = useForm<LinkModel>({
        mode: "onTouched"
            });

  const [nameFocus, setNameFocus] = useState(false);
  const [pathFocus, setPathFocus] = useState(false);
  const [addedFocus, setAddedFocus] = useState(false);
  const history = useHistory();

  async function send(link:LinkModel) {
        try{
            const response = await tokenAxios.post<LinkModel>(globals.urls.user+"link",link);
            store.dispatch(LinkAddedAction(response.data));
            history.push('/user/links');
            notify.success(SccMsg.ADDED_EXPENSE);
        }
        catch (err) {
          notify.error(err);
        };
    };

    useEffect(() => {
      if (store.getState().authState.client?.clientType!==ClientType.user) {
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
            <Card className="card-signup" data-background-color="blue">
              <Form onSubmit={handleSubmit(send)} className="form" method="">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Add Link</CardTitle>
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
                          name="name"
                          type="text"
                          onFocus={() => setNameFocus(true)}
                          onBlur={() => setNameFocus(false)}
                          {...register("name",{
                            required:true,
                            minLength:2,
                          })}
                        />

                     <br />
                         {errors.name?.type==='required' && <span id="errors">Missing name</span>}
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
                          name="path"
                          type="text"
                          onFocus={() => setPathFocus(true)}
                          onBlur={() => setPathFocus(false)}
                          {...register("path",{
                            required:true,
                            minLength:12,
                          })}
                        />

                        <br />
                         {errors.path?.type==='required' && <span id="errors">Missing path</span>}
                         {errors.path?.type==='minLength' && <span id="errors">path is too short</span>}

                        <br />
                  </InputGroup>


                  <InputGroup className={"no-border" + (addedFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i>📅</i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input
                          placeholder="Added the..."
                          type="date"
                          name="added"
                          onFocus={() => setAddedFocus(true)}
                          onBlur={() => setAddedFocus(false)}
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
                    <Button id="iconBig" onClick={() => history.push("/user/links")}>↩</Button>
                  </div>
      </Container>
    </div>
        </div>
    );
};

export default AddLink;
