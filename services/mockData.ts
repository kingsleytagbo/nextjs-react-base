import { NextApiRequest } from 'next';
import { Blog } from '../models/blog';
import { Gallery } from '../models/gallery';
import { User, EmptyUser } from '../models/user';
import { FileCache } from './fileCache';

export class MockAuthenticator {
  private static _instance: MockAuthenticator;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}
  getAuthUser(req: NextApiRequest) {
    const base64AuthenticationHeader =
      (req.headers.authorization || '').split(' ')[1] || '';
    const [authToken] = Buffer.from(base64AuthenticationHeader, 'base64')
      .toString()
      .split(':');
    const authUser = MockServer.UserData.getUser({
      ...EmptyUser,
      UserID: authToken,
    });
    return authUser;
  }

  hasAdminRole(authUser?: User) {
    const userRoles = authUser?.RoleNames || [''];
    if (userRoles.indexOf('admin') > -1) {
      return true;
    } else {
      return false;
    }
  }

  hasSubscriberRole(authUser?: User) {
    const userRoles = authUser?.RoleNames || [''];
    if (userRoles.indexOf('subscriber') > -1) {
      return true;
    } else {
      return false;
    }
  }
}

class MockUserData {
  users: Array<User> = [
    {
      ITCC_UserID: 1,
      UserID: '9235607A-C308-40E4-987F-2E74848637A8',
      UserName: 'admin',
      EmailAddress: '',
      FirstName: 'System',
      LastName: 'Admin',
      Password: 'password',
      RoleNames: ['admin'],
    },
  ];

  private static _instance: MockUserData;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  getFileCache() {
    const fileCacheItems = FileCache.Instance.getData('users.json');
    if(fileCacheItems){ this.users = fileCacheItems };
    return this.users;
  }

  saveFileCache(values: any) {
    FileCache.Instance.saveData('users.json', values);
    this.users = values;
  }

  getUsers() {
    return this.getFileCache();
  }

  saveUsers(values: any) {
    this.saveFileCache(values);
  }

  getUser(item: User) {
    let user: User | undefined;
    this.getFileCache();
    if (this.users && this.users.length > 0) {
      user = this.users.find(
        (user) =>
          user.ITCC_UserID === item.ITCC_UserID ||
          user.UserName === item.UserName ||
          user.UserID === item.UserID
      );
    }
    return user;
  }

  updateUser(item: User) {
    this.getFileCache();
    if (this.users && this.users.length > 0) {
      for (let u = 0; u < this.users.length; u++) {
        if (this.users[u].ITCC_UserID === item.ITCC_UserID) {
          this.users[u] = item;
          this.saveFileCache(this.users);
        }
      }
    }
    return;
  }

  deleteUser(item?: User) {
    this.getFileCache();
    if (item && this.users && this.users.length > 0) {
      this.users.forEach((user, index) => {
        // cannot delete the admin suer
        if ((item === user) && (user.RoleNames?.indexOf('admin') === -1) ) {
          this.users.splice(index, 1);
          this.saveFileCache(this.users);
        }
      });
    }
  }
}

class MockGalleryData {
  items: Array<Gallery> = [];

  private static _instance: MockGalleryData;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  getFileCache() {
    const fileCacheItems = FileCache.Instance.getData('gallerys.json');
    if(fileCacheItems){ this.items = fileCacheItems };
    return this.items;
  }

  saveFileCache(values: any) {
    FileCache.Instance.saveData('gallerys.json', values);
    this.items = values;
  }

  getGallerys() {
    return this.getFileCache();
  }

  saveGallerys(values: any) {
    this.saveFileCache(values);
  }

  getGallery(item: Gallery) {
    let user: Gallery | undefined;
    this.getFileCache();
    if (this.items && this.items.length > 0) {
      user = this.items.find(
        (user) =>
          user.ITCC_ImageID === item.ITCC_ImageID ||
          user.FilePath === item.FilePath
      );
    }
    return user;
  }

  updateGallery(item: Gallery) {
    this.getFileCache();
    if (this.items && this.items.length > 0) {
      for (let u = 0; u < this.items.length; u++) {
        if (this.items[u].ITCC_ImageID === item.ITCC_ImageID) {
          this.items[u] = item;
          this.saveFileCache(this.items);
        }
      }
    }
    return;
  }

  deleteGallery(item?: Gallery) {
    this.getFileCache();
    if (item && this.items && this.items.length > 0) {
      this.items.forEach((user, index) => {
        if (item === user) {
          this.items.splice(index, 1);
          this.saveFileCache(this.items);
        }
      });
    }
  }
}

class MockBlogData {
  items: Array<Blog> = [];

  private static _instance: MockBlogData;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  getFileCache() {
    const fileCacheItems = FileCache.Instance.getData('blogs.json');
    if(fileCacheItems){ this.items = fileCacheItems };
    return this.items;
  }

  saveFileCache(values: any) {
    FileCache.Instance.saveData('blogs.json', values);
    this.items = values;
  }

  getBlogs() {
    return this.getFileCache();
  }

  saveBlogs(values: any) {
    this.saveFileCache(values);
  }

  getBlog(item: Blog) {
    let user: Blog | undefined;
    this.getFileCache();
    if (this.items && this.items.length > 0) {
      user = this.items.find(
        (user) =>
          user.ITCC_BlogID === item.ITCC_BlogID ||
          user.Slug === item.Slug ||
          user.Permalink === item.Permalink
      );
    }
    return user;
  }

  updateBlog(item: Blog) {
    this.getFileCache();
    if (this.items && this.items.length > 0) {
      for (let u = 0; u < this.items.length; u++) {
        if (this.items[u].ITCC_BlogID === item.ITCC_BlogID) {
          this.items[u] = item;
          this.saveFileCache(this.items);
        }
      }
    }
    return;
  }

  deleteBlog(item?: Blog) {
    this.getFileCache();
    if (item && this.items && this.items.length > 0) {
      this.items.forEach((user, index) => {
        if (item === user) {
          this.items.splice(index, 1);
          this.saveFileCache(this.items);
        }
      });
    }
  }
}

export const MockServer = {
  UserData: MockUserData.Instance,
  GalleryData: MockGalleryData.Instance,
  BlogData: MockBlogData.Instance,
};
