import { User } from "../model/user"
export interface IUsersRepository{
    findByEmail(email:string):Promise<User>;
    save(user:User):Promise<void>;
}