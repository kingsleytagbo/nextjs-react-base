export interface IStorage {
  getData(key?: any): any | undefined;
  saveData(value: any, key?: any): any | undefined;
}

export class SessionStorage implements IStorage {
  getData(key: string) {
    const data = localStorage.getItem(key);
    return data;
  }

  saveData(value: any, key: any) {
    const data = JSON.stringify(value || {});
    localStorage.setItem(key, data);
  }
}
