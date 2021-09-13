import {  useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import store from "../../../Redux/Store";
import link from "../../../assets/img/link.png";
import todo from "../../../assets/img/todo.png";
import expense from "../../../assets/img/expense.png";
import "./Home.css";

function Home(): JSX.Element {

    const [client,setClient]=useState(store.getState().authState.client);
    const history = useHistory();

    return (
        <div className="Home section">
            <div className="centerIt">
                <h2 id= "niceTitle4">  In N-Tracker you can keep track of your expenses, your todo's and add awesome links</h2>
                <br />

               <div className="flx">
                   <div className="flx1"><img style={{width:"60%",height:"auto"}} src={expense} alt="" /></div>
                   <div className="flx1"><img style={{width:"60%",height:"auto"}} src={todo} alt="" /></div>
                   <div className="flx1"><img style={{width:"60%",height:"auto"}} src={link} alt="" /></div>
               </div>
                <br />
            {!client&&
                <>
                <br />
                    <span id ="white">
                        For more info and purchase Sign up or Login
                    </span> <br /> <br />
                </>
            }
               
                    {!client&&
                    <>
                    <NavLink   to="/signup"><Button color="" size="small"><span id="grey">SignUp</span></Button></NavLink>
                   <NavLink to="/login"> <Button color="" size="small"><span  id="grey">SignIn</span></Button> </NavLink><br />   
                    </>
                    }
                    <br />
                    <br />

                    <Button color="info" id="about" onClick={()=>history.push("/about")}>About</Button>
            </div>
            
        </div>
    );
};

export default Home;