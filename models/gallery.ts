export type Gallery = {
  ITCC_ImageID: number;
  Name: string;
  Description: string;
  FilePath: string;
  FileGroup: string;
  PublishUrl?: string;
  SourceUrl?: string;
  File?:File | null;
  ITCC_WebsiteID?: number;
};

export const EmptyGallery: Gallery = {
  ITCC_ImageID: 0,
  Name: '',
  Description: '',
  FilePath: '',
  FileGroup: '',
  PublishUrl: '',
  SourceUrl: '',
  File: null,
  ITCC_WebsiteID:1
};
