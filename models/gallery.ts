export type Gallery = {
  ITCC_UserID: number;
  UserID: string;
  UserName: string;
  Password: string;
  EmailAddress: string;
  FirstName: string;
  LastName: string;
  RoleNames?: Array<string>;
  File?:File;
};

export const EmptyGallery: Gallery = {
  ITCC_UserID: 0,
  UserID: '',
  UserName: '',
  Password: '',
  EmailAddress: '',
  FirstName: '',
  LastName: '',
  RoleNames: []
};
