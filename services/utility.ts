import { json } from "stream/consumers";
import { IStorage, SessionStorage } from "./storage";

export class Utility implements IStorage {

    appStorageKey = 'app_storage_key_' + process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE;

    isUserLoggedIn(key:any) {
        const value:any = this.getData(key);
        const data = (value && (value.AuthID && value.RoleNames)) ? true : false;
        return data;
    }


    getData(key: string) {
        const storage = new SessionStorage();
        const value = storage.getData(this.appStorageKey + key);
        const data = value ? JSON.parse(value) : {};
        return data;
    }

    saveData(value: any, key: any) {
        const storage = new SessionStorage();
        storage.saveData(value, this.appStorageKey + key);
    }

}