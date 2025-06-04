export interface Group {
    id: string,
    displayName: string,
    createdAt: string, 
}

export interface SignIns {
    userDisplayName: string;
    createdDateTime: string,
    errorCode: number
}

export interface Tenant {
    id: string;
    name: string;
}

export interface User{
    id: string;
    displayName: string;
    userPrincipalName: string;
    createdAt: string, 
}