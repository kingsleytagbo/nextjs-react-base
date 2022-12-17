export type Comment = {
  ITCC_CommentID: number; 
  ITCC_WebsiteID: number; 
  ITCC_StatusID: number; 
  ITCC_UserID: number; 
  ITCC_PostID:number; 
  ReplyPostID:number;  
  ReplyLevel:1, SortOrder:1,
  CommentTitle: string;
  CommentDetail: string; 
  CommentFullName: string;  
  PermaID: string;
};

export const EmptyComment: Comment = {
  ITCC_CommentID: 0, 
  ITCC_WebsiteID: -1, 
  ITCC_StatusID: -1, 
  ITCC_UserID: -1, 
  ITCC_PostID:1, 
  ReplyPostID:-1,
  CommentTitle: '', CommentDetail: '', CommentFullName: '',  PermaID: '', 
  ReplyLevel:1, SortOrder:1
};
