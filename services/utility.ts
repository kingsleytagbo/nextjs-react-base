import { json } from "stream/consumers";
import { IStorage, SessionStorage } from "./storage";

export enum BaseUrlTypes{
    Authenticate = 'login/authenticate/',
    Users = 'users/'
}

export enum HttpRequestTypes{
    GET = 'GET',
    DELETE = 'DELETE'
}

class Utility implements IStorage {

    appStorageKey = 'app_storage_key_' + process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE;

    private static _instance: Utility;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private constructor(){}

    getUserAuthStatus(key:any) {
        const value:any = this.getData(key);
        const data = (value && (value.AuthID && value.RoleNames)) ? true : false;
        return data;
    }

    getUserAuthRoles(key:any) {
        const value:any = this.getData(key);
        const hasAdmin = (value && value.RoleNames) ? value.RoleNames.find((name:string) => {
            return name.toLowerCase() === 'admin';
          }) : null;
        const result = {...value, IsAdmin: hasAdmin ? true : false};
        return result;
    }

    getUserAuthHeader(key:string){
        const authValue = btoa(this.getUserAuthRoles(key)?.AuthID || '');
        return { Authorization: `Basic ${authValue}` };
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

    getBaseApi(urlType: BaseUrlTypes){
        const baseUrl = process.env.NEXT_PUBLIC_USE_REMOTE_API === 'true' ? process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_API : 'api';
        // console.log({Remote : process.env.NEXT_PUBLIC_USE_REMOTE_API, local: process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_API});

        let baseApiPath = '';
            switch(urlType){
                case BaseUrlTypes.Authenticate:
                    baseApiPath = 'login/authenticate';
                    break;
                case BaseUrlTypes.Users:
                    baseApiPath = 'users';
                    break;
                    default:
                        break;
            }
        return baseUrl + '/' + baseApiPath;
    }

    generateUUID() {
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

}

export const utils = Utility.Instance;