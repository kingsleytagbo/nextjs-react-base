import { User } from "../models/user";

export class MockData{

   static users: Array<User> = [{ ITCC_UserID:1, Username: 'admin', Password: 'password' }];
    
    static getUsers() {
        return this.users;
    }

    static saveUsers(values: any) {
        this.users = values;
    }

    static getUser(item: User){
      let user:User | undefined;
      if(this.users && this.users.length > 0 ){
        user = this.users.find( user => 
          (user.ITCC_UserID === item.ITCC_UserID || user.Username === item.Username));
      }
      return user;
    }

    static updateUser(item: User){
      if(this.users && this.users.length > 0 ){
        for(let u = 0; u < this.users.length; u++){
          if(this.users[u].ITCC_UserID === item.ITCC_UserID){
            this.users[u] = item;
          }
        }
      }
      return;
    }

}