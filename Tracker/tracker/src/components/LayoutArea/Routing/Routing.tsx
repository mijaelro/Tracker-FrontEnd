import { Redirect, Route, Switch } from "react-router";
import {  HashRouter } from "react-router-dom";
import SendEmail from "../../../Services/SendEmail/SendEmail";
import ExpenseDetailsAdmin from "../../MainArea/AdminArea/ExpensesArea/ExpenseDetails/ExpenseDetailsAdmin";
import ExpensesAdmin from "../../MainArea/AdminArea/ExpensesArea/ExpensesAdmin/ExpensesAdmin";
import LinksAdmin from "../../MainArea/AdminArea/LinksArea/LinksAdmin/LinksAdmin";
import TodosAdmin from "../../MainArea/AdminArea/TodosAreaAdmin/TodosAdmin/TodosAdmin";
import AddUser from "../../MainArea/AdminArea/UsersAreaAdmin/AddUser/AddUser";
import UserDetailsAdmin from "../../MainArea/AdminArea/UsersAreaAdmin/UserDetailsAdmin/UserDetailsAdmin";
import UsersAdmin from "../../MainArea/AdminArea/UsersAreaAdmin/UsersAdmin/UsersAdmin";
import Login from "../../MainArea/AuthArea/Login/Login";
import Logout from "../../MainArea/AuthArea/Logout/Logout";
import SignUp from "../../MainArea/AuthArea/SignUp/SignUp";
import Home from "../../MainArea/Home/Home";
import AddExpense from "../../MainArea/UserArea/ExpensesArea/AddExpense/AddExpense";
import EditExpense from "../../MainArea/UserArea/ExpensesArea/EditExpense/EditExpense";
import Expenses from "../../MainArea/UserArea/ExpensesArea/Expenses/Expenses";
import AddLink from "../../MainArea/UserArea/LinksArea/AddLink/AddLink";
import EditLink from "../../MainArea/UserArea/LinksArea/EditLink/EditLink";
import Links from "../../MainArea/UserArea/LinksArea/Links/Links";
import AddTodo from "../../MainArea/UserArea/TodosArea/AddTodo/AddTodo";
import EditTodo from "../../MainArea/UserArea/TodosArea/EditTodo/EditTodo";
import TodoDetails from "../../MainArea/UserArea/TodosArea/TodoDetails/TodoDetails";
import Todos from "../../MainArea/UserArea/TodosArea/Todos/Todos";
import About from "../../SharedArea/About/About";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			 <HashRouter>
			 <Switch>
            
             <Route path = '/home' component={Home} exact/>
             <Route path = '/sendEmail' component={SendEmail} exact/>

             <Route path = '/login' component={Login} exact/>
             <Route path = '/signUp' component={SignUp} exact/>
             <Route path = '/logout' component={Logout} exact/>
            
             <Route path = '/about' component={About} exact/>


             <Route path = '/user/expenses' component={Expenses} exact/>
             <Route path = '/user/expense/add' component={AddExpense} exact/>
             <Route path = '/user/expense/edit/:id' component={EditExpense} exact/>

             <Route path = '/user/links' component={Links} exact/>
             <Route path = '/user/link/add' component={AddLink} exact/>
             <Route path = '/user/link/edit/:id' component={EditLink} exact/>

             <Route path = '/user/todos' component={Todos} exact/>
             <Route path = '/user/todo/add' component={AddTodo} exact/>
             <Route path = '/user/todo/details/:id' component={TodoDetails} exact/>
             <Route path = '/user/todo/edit/:id' component={EditTodo} exact/>


             <Route path = '/admin/expenses' component={ExpensesAdmin} exact/>
             <Route path = '/admin/expense/details/:id' component={ExpenseDetailsAdmin} exact/>

             <Route path = '/admin/links' component={LinksAdmin} exact/>

             <Route path = '/admin/todos' component={TodosAdmin} exact/>

             <Route path = '/admin/users' component={UsersAdmin} exact/>
             <Route path = '/admin/user/details/:id' component={UserDetailsAdmin} exact/>
             <Route path = '/admin/user/add' component={AddUser} exact/>


             <Redirect from='/' to='home' exact/>
             <Redirect from='' to='home' exact/>
             <Redirect from='/*' to='home' exact/>

            </Switch>
            </HashRouter>
        </div>
    );
}

export default Routing;
