export interface IHrUserSchema {
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
    password: string;
    isVerified?: boolean;
    isAdmin?: boolean;
    active?: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string | undefined;
    verifyTokenExpiry?: Date | undefined;
}
