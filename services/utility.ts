import { json } from 'stream/consumers';
import { IStorage, SessionStorage } from './storage';

export enum BaseUrlTypes {
  Authenticate = 'login/authenticate/',
  Users = 'users/',
  Gallery = 'gallery/',
  Blog = 'blog/',
  Image = 'image',
}

export enum HttpRequestTypes {
  GET = 'GET',
  DELETE = 'DELETE',
}

class Utility implements IStorage {
  appStorageKey =
    'app_storage_key_' + process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE;

  private static _instance: Utility;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  getAppData() {
    const storage = new SessionStorage();
    const value = storage.getData(this.appStorageKey);
    const data = value ? JSON.parse(value) : {};
    return data;
  }

  getData(key?: string) {
    const data = this.getAppData();
    let result = data;
    if (key) {
      result = data[key] || {};
    }
    return result;
  }

  saveData(value: any, key: any) {
    const storage = new SessionStorage();
    const appStorage = this.getAppData();
    appStorage[key] = value;

    storage.saveData(appStorage, this.appStorageKey);
    const keyData = this.getData(key);
    const database = this.getData();
  }

  getUserAuthStatus(key: any) {
    const value: any = this.getData(key);
    const data = value && value.AuthID && value.RoleNames ? true : false;
    return data;
  }

  getUserAuthRoles(key: any) {
    const value: any = this.getData(key);
    const hasAdmin =
      value && value.RoleNames && value.RoleNames.length > 0
        ? value.RoleNames.find((name: string) => {
            return name.toLowerCase() === 'admin';
          })
        : null;
    // console.log({getUserAuthRole: value, hasAdmin: hasAdmin, RoleNames: value.RoleNames})
    const result = { ...value, IsAdmin: hasAdmin ? true : false };
    return result;
  }

  getUserAuthHeader(key: string) {
    const authValue = btoa(this.getUserAuthRoles(key)?.AuthID || '');
    return { Authorization: `Basic ${authValue}` };
  }

  getBaseApi(urlType: BaseUrlTypes, pageNumber?: number, pageSize?: number) {
    const useRemote =
      process.env.NEXT_PUBLIC_USE_REMOTE_API?.toLowerCase() === 'true'
        ? true
        : false;
    const baseUrl = useRemote
      ? process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_API
      : 'api';
    // console.log({Remote : process.env.NEXT_PUBLIC_USE_REMOTE_API, local: process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_API});

    /*
      '/' +
  process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE;
  */

    let baseApiPath = '';
    switch (urlType) {
      case BaseUrlTypes.Authenticate:
        baseApiPath = 'login/authenticate';
        break;
      case BaseUrlTypes.Users:
        baseApiPath = 'users';
        break;
      case BaseUrlTypes.Gallery:
        baseApiPath = 'gallery';
        break;
      case BaseUrlTypes.Blog:
        baseApiPath = 'blog';
        break;
      case BaseUrlTypes.Image:
        baseApiPath = 'image';
        break;
      default:
        break;
    }

    let url =
      baseUrl +
      '/' +
      baseApiPath +
      (useRemote
        ? '/' + process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE
        : '');

    if (useRemote && pageNumber) {
      url += '/page/' + pageNumber + '/' + (pageSize || 10);
    }
    else if (!useRemote && process.env.NEXT_PUBLIC_REACT_APP_LOCALHOST_URL) {
      url = process.env.NEXT_PUBLIC_REACT_APP_LOCALHOST_URL + '/' + url;
    }

    return url;
  }

  generateUUID() {
    let d = new Date().getTime(); //Timestamp
    let d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  stripHTMLTags = (text: any) => {
    return (text || '')
      .replace(/<(.|\n)*?>/g, '')
      .replace('-->', '')
      .trim();
  };

  getPostIext = (value: any, length: number = 160) => {
    const text = (this.stripHTMLTags(value || '') || '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    if (text && text.length <= length) {
      return text;
    } else {
      return text.substring(0, length);
    }
  };
}

export const utils = Utility.Instance;
