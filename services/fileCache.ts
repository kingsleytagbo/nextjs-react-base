
import fs from 'fs';
import path from 'path';
const FILE_CACHE_PATH = path.resolve('./public', 'file_cache');

export class FileCache {
  private constructor() {}
  private static _instance: FileCache;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public getData(folder: string) {
    let cachedData

    try {
      const filePath = path.join(FILE_CACHE_PATH, folder);
      const data = fs.readFileSync(filePath, 'utf8');
      cachedData = data ? JSON.parse(data) : null;

    } catch (error) {
      console.log({ 'cache not initialized for: ': error })
    }

    return cachedData;
  }

  public saveData(folder: string, content: any) {
    let cachedData

    try {
      const filePath = path.join(FILE_CACHE_PATH, folder);
      const data =  JSON.stringify(content);
      fs.writeFileSync(filePath, data, 'utf8');

    } catch (error) {
      console.log({ 'cache writing error for: ': error })
    }
  }

};
