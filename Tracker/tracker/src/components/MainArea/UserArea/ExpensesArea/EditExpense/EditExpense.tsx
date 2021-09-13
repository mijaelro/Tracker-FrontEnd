import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText,  Row } from "reactstrap";
import { useForm } from "react-hook-form";
import store from "../../../../../Redux/Store";
import ExpenseModel from "../../../../../Models/ExpenseModel";
import globals from "../../../../../Services/Globals";
import { ExpenseDeletedAction, ExpenseUpdatedAction } from "../../../../../Redux/ExpensesState";
import notify, { ErrMsg, SccMsg } from "../../../../../Services/Notification";
import ClientType from "../../../../../Models/ClientTypeModel";
import tokenAxios from "../../../../../Services/InterceptorAxois";
import "./EditExpense.css";

interface RouteParam {
    id: string;
};
  
interface ExpenseDetailsProps extends RouteComponentProps<RouteParam> {};

function EditExpense(props:ExpenseDetailsProps): JSX.Element {

    const id = +props.match.params.id;
    const[expenses,setExpenses]=useState(store.getState().expensesState.expenses);
    const [expense,setExpense] = useState(store.getState().expensesState.expenses.find((c) => c.id === id));
    const {register,handleSubmit,formState:{errors }} = useForm<ExpenseModel>({
        mode: "onTouched"
            });

    const [nameFocus, setNameFocus] = useState(false);
    const [priceFocus, setPriceFocus] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);
    const [purchaseFocus, setPurchaseFocus] = useState(false);        
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[price,setPrice]=useState('')
    const[purchaseDate,setPurchaseDate]=useState('')
    const history = useHistory();

    const editExpense = async (expense:ExpenseModel) => {
        try {
          expense.id = id; 
          const response =await tokenAxios.put<ExpenseModel>(globals.urls.user+"expense",expense);
          store.dispatch(ExpenseUpdatedAction( response.data));
          setExpense( response.data);
          notify.success(SccMsg.UPDATED_SUCCESS);  
          history.push('/user/expenses'); 
        }catch (err) {
          notify.error(err);
        };
      };

    const deleteExpense =async ()=>{
        const res = window.confirm(
          "Are you sure you want to delete id=" + id + "?"
        );
        if (res) {
          try {
            await tokenAxios.delete<ExpenseModel>(globals.urls.user+"expense/"+id);
            store.dispatch(ExpenseDeletedAction(id));
            notify.success(SccMsg.DELETED_SUCCESS);
            history.push('/user/expenses');
          }catch (err) {
           notify.error(err);
          };
        };
    };

    const handleName = (e: { target: { value: string; }; }) =>{
        setName(e.target.value);
        return name; 
    };

    const handlePrice = (e: { target: { value: string; }; }) =>{
        setPrice(e.target.value);
        return price; 
    };

    const handleDescription = (e: { target: { value: string; }; }) =>{
        setDescription(e.target.value);
        return description; 
    };

    const handlePurchaseDate = (e: { target: { value: string; }; }) =>{
        setPurchaseDate(e.target.value);
        return purchaseDate; 
    };

      useEffect(() => {
        if (store.getState().authState.client?.clientType!==ClientType.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            history.push("/login");
        };
          const unsubscribe = store.subscribe(()=>{
            setExpenses(store.getState().expensesState.expenses);    
        });
        return unsubscribe;
      });


    return (
      <div className="EditExpense">
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
			    {expense && (
          <>
            <Card className="card-signup" data-background-color="blue">
              <Form className="form" onSubmit={handleSubmit(editExpense)} >
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" id="niceTitle3">Edit Expense</CardTitle>
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
                          defaultValue ={expense?.name}
                          onChange={()=>handleName}
                          {...register("name",{
                                minLength:2,
                          })}
                        />   
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
                          type="number"
                          step=".1"
                          name="price"
                          onFocus={() => setPriceFocus(true)}
                          onBlur={() => setPriceFocus(false)} 
                          defaultValue ={expense?.price}
                          onChange={()=>handlePrice}
                          {...register("price")}
                        />
                         
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
                          defaultValue={expense?.description} 
                          onChange={()=>handleDescription}
                              {...register("description",{
                                  minLength:9,
                          })}
                        />
                          <br />
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
                          //check a way to set the dates default value
                            placeholder="PurchaseDate..."
                            type="date"  
                            name="purchaseDate" 
                            onChange={()=>handlePurchaseDate}
                            onFocus={() => setPurchaseFocus(true)}
                            onBlur={() => setPurchaseFocus(false)}
                            defaultValue={expense?.purchaseDate.toString()}

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
                        size="small"
                        type="submit"
                      >
                        ✔️
                      </Button>
                      <Button 
                        className="btn-neutral btn-round"
                        color="danger"
                        size="small"
                        type="submit"
                        onClick={()=>deleteExpense()}>
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
                    <Button id="iconBig" onClick={() => history.push("/user/expenses")}>↩</Button>
                  </div>
      </Container>
    </div>
  </div>
 );
};

export default EditExpense;


