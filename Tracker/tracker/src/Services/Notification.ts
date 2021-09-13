import { Notyf } from "notyf";

export enum SccMsg {
    DOWNLOADED_EXPENSES = "ALL EXPENSES DOWNLOADED",
    DELETED_SUCCESS = "DELETED SUCCESSFULLY",
    UPDATED_SUCCESS = "UPDATED SUCCESSFULLY",
    ADDED_EXPENSE = "ADDED EXPENSE SUCCESSFULLY",
    DOWNLOADED_LINKS = "DOWNLOADED LINKS SUCCESSFULLY",
    DOWNLOADED_TODOS = "DOWNLOADED TODOS SUCCESSFULLY",
    ADDED_TODO = "ADDED TODO SUCCESSFULLY",
    LOGIN_SUCCESS = "LOGIN SUCCESSFUL",
    LOGOUT_SUCCESS = "LOGOUT SUCCESSFUL",
    ADDED_USER = "ADDED USER SUCCESSFULLY",
    DOWNLOADED_USERS = "DOWNLOADED USERS SUCCESSFULLY",
    EMAIL_SENT = "EMAIL SENT SUCCESSFULLY"
};

export enum ErrMsg {
  PLS_LOGIN = "PLEASE LOGIN",
  NO_EXPENSES = "NO EXPENSES FOUND",
  NO_LINKS = "NO LINKS FOUND",
  NO_USER = "NO USER FOUND",
  NO_TODOS = "NO TODOS FOUND",

};

class Notify{

    private notification = new Notyf({duration:2000, position:{x:"left",y:"top"}});
 
    static error: any;
   
    public success(message: string){
        this.notification.success(message);
    };

    public error(err: any){
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    };

    private extractMsg(err: any): string{
        
		if(typeof err === 'string'){
            return err;
        };

        if(typeof err?.response?.data === 'string'){ 
            return err.response.data;
        };

        if(Array.isArray(err?.response?.data)){ 
            return err?.response?.data[0];
        };
    
        if(typeof err?.message === 'string'){
            return err.message;
        };

        return "Damn, an error occurred, please try again.";
    };
};
const notify = new Notify();

export default notify;

