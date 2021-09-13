import { combineReducers, createStore } from "redux";
import {linksReducer} from "./LinksState";
import {todosReducer} from "./TodosState";
import {expensesReducer} from "./ExpensesState";
import {usersReducer} from "./UserState";
import { authReducer } from "./AuthState";

const reducers = combineReducers({
  
    linksState: linksReducer,
    todosState:todosReducer,
    expensesState: expensesReducer,
    usersState: usersReducer,
    authState:authReducer

 });
const store = createStore(reducers);


export default store;