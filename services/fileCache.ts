
import fs from 'fs';
import path from 'path';
const FILE_CACHE_DIRECTORY = path.resolve('./public', 'file_cache');
const PUBLIC_FILE_UPLOAD_DIRECTORY = path.resolve('./public', 'uploads');

export class FileCache {
  private constructor() {}
  private static _instance: FileCache;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  getFileUploadDirectory(){
    let uploadDir = '';
    if (process.env.NEXT_PUBLIC_FILE_UPLOAD_DIRECTORY) {
      uploadDir = path.join(
        process.env.NEXT_PUBLIC_FILE_UPLOAD_DIRECTORY || '',
        process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE || ''
      );
    }
    else {
      uploadDir = path.resolve(PUBLIC_FILE_UPLOAD_DIRECTORY,
        (process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE || '')
      );
    }
    return uploadDir;
  }

  public getData(folder: string) {
    let cachedData;

    try {
      const filePath = path.resolve(FILE_CACHE_DIRECTORY, folder);
      const data = fs.readFileSync(filePath, 'utf8');
      cachedData = data ? JSON.parse(data) : null;

    } catch (error) {
      console.log({ 'cache not initialized for: ': error })
    }

    return cachedData;
  }

  public saveData(folder: string, content: any) {

    try {
      const filePath = path.join(FILE_CACHE_DIRECTORY, folder);
      const data =  JSON.stringify(content);
      fs.writeFileSync(filePath, data, 'utf8');

    } catch (error) {
      console.log({ 'cache writing error for: ': error })
    }
  }

};
