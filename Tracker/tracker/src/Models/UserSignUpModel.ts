import ClientType from "./ClientTypeModel";

class UserSignUpModel{
public id: number;
public firstName:string;
public lastName:string;
public email:string;
public password:string;
public clientType:ClientType; 
}
export default UserSignUpModel; 