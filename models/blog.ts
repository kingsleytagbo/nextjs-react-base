export type Blog = {
  ITCC_BlogID: number;
  Name: string;
  Description: string;
  Slug: string;
  BlogType: string;
  Permalink: string;
  PostDate: Date;
  ImageUrl: string;
  Category: string;
  Tags: string;
  ITCC_WebsiteID?: number;
};

export const EmptyBlog: Blog = {
  ITCC_BlogID: 0,
  Name: '',
  Description: '',
  Slug: '',
  BlogType: '',
  Category: '',
  Permalink: '',
  PostDate: new Date(),
  ImageUrl: '',
  Tags: '',
  ITCC_WebsiteID: 1,
};
