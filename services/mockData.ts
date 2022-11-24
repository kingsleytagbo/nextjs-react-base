import { User } from "../models/user";

class MockData{

   users: Array<User> = [{ ITCC_UserID:1, Username: 'admin', Password: 'password', UserID: '32E3785C-DD3D-426D-BDBE-92F2818C0AC9' }];
   
   private static _instance:MockData;

   public static get Instance()
   {
       return this._instance || (this._instance = new this());
   }

   private constructor(){}

    getUsers() {
        return this.users;
    }

    saveUsers(values: any) {
        this.users = values;
    }

    getUser(item: User){
      let user:User | undefined;
      if(this.users && this.users.length > 0 ){
        user = this.users.find( user => 
          (user.ITCC_UserID === item.ITCC_UserID || user.Username === item.Username));
      }
      return user;
    }

    updateUser(item: User){
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

export const mockServer = MockData.Instance;