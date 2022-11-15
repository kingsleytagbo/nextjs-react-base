import { User } from "../models/User";

export class MockData{

   static data: Array<User> = [{ ITCC_UserID:1, Username: 'admin', Password: 'password' }];
    
    static getUsers() {
        return this.data;
    }

    static saveUsers(values: any) {
        this.data = values;
        console.log({data: this.data, values: values})
    }

}