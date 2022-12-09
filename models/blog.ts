export type Blog = {
  ITCC_BlogID: number;
  Name: string;
  Description: string;
  FilePath: string;
  FileGroup: string;
  PublishUrl?: string;
  SourceUrl?: string;
  File?:File | null;
  ITCC_WebsiteID?: number;
};

export const EmptyBlog: Blog = {
  ITCC_BlogID: 0,
  Name: '',
  Description: '',
  FilePath: '',
  FileGroup: '',
  PublishUrl: '',
  SourceUrl: '',
  File: null,
  ITCC_WebsiteID:1
};
