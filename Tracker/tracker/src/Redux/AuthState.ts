import ClientModel from "../Models/ClientModel";
import UserModel from "../Models/UserModel";

export class AuthState{
    public client: ClientModel =null;
    public constructor(){
        const storedUser = JSON.parse(localStorage.getItem('client'));
            if(storedUser) {
                this.client = storedUser;
            };
    };
};

export enum AuthActionType {
    SignUp = "SignUp",
    Login = "Login",
    Logout = "Logout"
};

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
};

export function signUpAction(user: UserModel): AuthAction {
    return { type: AuthActionType.SignUp,payload:user };
};

export function loginAction(client: ClientModel): AuthAction {
    return { type: AuthActionType.Login ,payload:client};
};

export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout};
};

export function authReducer(currentState: AuthState = new AuthState(),
                            action:AuthAction): AuthState{
    const newState = {...currentState};
    switch(action.type){

        case AuthActionType.SignUp: 
            newState.client = action.payload;
            localStorage.setItem("client",JSON.stringify(newState.client)); 
            break;

        case AuthActionType.Login:
            newState.client = action.payload;
            localStorage.setItem("client",JSON.stringify(newState.client)); 
            break;

        case AuthActionType.Logout:
            newState.client = null;
            localStorage.removeItem("client");
            break;      
    };
    
    return newState; 
};