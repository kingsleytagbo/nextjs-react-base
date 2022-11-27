
export type User = {
    ITCC_UserID: number,
    UserID: string,
    UserName: string,
    Password: string,
    EmailAddress: string,
    FirstName:string,
    LastName:string,
    RoleNames?: Array<string>
};

export const EmptyUser: User = { ITCC_UserID: 0, UserID:'', UserName: '', Password: '', 
EmailAddress: '',  FirstName:'', LastName:'', RoleNames: []};