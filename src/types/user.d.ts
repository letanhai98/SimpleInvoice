type TUSer = {
    userId: string;
    email: string;
    firtName: string;
    lastName: string;
    userName: string;
    access_token: string;
    status: Active;
    lastLoginAt: string;
    contacts: [];
    addresses: [];
    listCustomFields: any[];
    employmentDetails: [];
    memberships: TUserMembership[];
    kycDetails: {
        documents: []
    };
    apps: TAppUser[];
    listRoles: string[];
    permissions: [];
    createdAt: string;
    passwordExpired: boolean;
    updatedAt: string;
}

type TAppUser = {
    appName: string;
}

type TUserMembership = {
    membershipId: string;
    organisationId: string;
    roleName: string;
    token: string;
}

type TDataFetchToken = {
    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string;
    token_type: string;
    expires_in: number;
}