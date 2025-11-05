export interface IInitialStateHrUser {
    id?: string;
    profilePicture: {
        file: {
            name: string;
            data: string;
            contentType: string;
        };
    };
    name: string;
    surname: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    username: string;
}