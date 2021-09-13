import { useHistory } from "react-router";
import ExpenseModel from "../../../../../Models/ExpenseModel";
import { useForm } from "react-hook-form";
import store from "../../../../../Redux/Store";
import globals from "../../../../../Services/Globals";
import { ExpenseAddedAction } from "../../../../../Redux/ExpensesState";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import "./AddExpense.css";
import { useEffect, useState } from "react";
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

function AddExpense(): JSX.Element {

     const [nameFocus, setNameFocus] = useState(false);
     const [priceFocus, setPriceFocus] = useState(false);
     const [descriptionFocus, setDescriptionFocus] = useState(false);
     const [purchaseFocus, setPurchaseFocus] = useState(false);
     const history = useHistory();
     const {register,handleSubmit,formState: {errors},
    } = useForm<ExpenseModel>({ mode: "onTouched" });
   
    async function send(expense:ExpenseModel) {
      try{
          const response = await tokenAxios.post<ExpenseModel>(globals.urls.user+"expense",expense);
          store.dispatch(ExpenseAddedAction(response.data));
          history.push('/user/expenses');
          notify.success(SccMsg.ADDED_EXPENSE);
      }
      catch (err) {
        notify.error(err);
      }
  };

  useEffect(() => {
    if (store.getState().authState.client?.clientType!==ClientType.user) {
        notify.error(ErrMsg.PLS_LOGIN);
        history.push("/login");
    };
  });

     return (
        <div className="AddExpense">
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
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Add Expense</CardTitle>
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
                    className={"no-border" + (priceFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i>💸</i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input
                          placeholder="Price..."
                          name="price"
                          step=".1"
                          type="number"
                          onFocus={() => setPriceFocus(true)}
                          onBlur={() => setPriceFocus(false)}
                          {...register("price",{
                            required:true,
                          })}
                        />

                        <br />
                         {errors.price?.type==='required' && <span id="errors">Missing price</span>}
                        <br />
                  </InputGroup>


                  <InputGroup className={"no-border" + (descriptionFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input
                          placeholder="Description..."
                          type="text"
                          name="description"
                          onFocus={() => setDescriptionFocus(true)}
                          onBlur={() => setDescriptionFocus(false)}
                          {...register("description",{
                            required:true,
                            minLength:9
                          })}
                        />

                        <br />
                        {errors.description?.type==='required' && <span id="errors">Missing description</span>}
                        {errors.description?.type==='minLength' && <span id="errors">description is too short</span>}
                        <br />
                  </InputGroup>


                  <InputGroup className={"no-border" + (purchaseFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i>📅</i>
                      </InputGroupText>
                    </InputGroupAddon>
                        <Input
                          placeholder="PurchaseDate..."
                          name="purchaseDate"
                          type="date"
                          onFocus={() => setPurchaseFocus(true)}
                          onBlur={() => setPurchaseFocus(false)}
                          {...register("purchaseDate",{
                            required:true,
                          })}
                        />

                        <br />
                         {errors.purchaseDate?.type==='required' && <span id="errors">Missing purchaseDate</span>}
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
                    <Button id="iconBig" onClick={() => history.push("/user/expenses")}>↩</Button>
                  </div>
      </Container>
    </div>
  </div>
 );
};

export default AddExpense;
