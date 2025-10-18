export interface IFormDataType {
    [x: string]: string | number | undefined | boolean | { [p: string]: string };
    databaseName?: 'hrUsers' | 'candidates';
    id?: string;
    name?: string;
    surname?: string;
    companyName?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    linkedIn?: string;
    phoneNumber?: string;
    email?: string;
    username?: string;
    password?: string;
    archived?: string;
    employed?: string;
    rejected?: string;
    emailType?: string;
    emailText?: string;
    emailHost?: string;
    archive?: string;
    hire?: string;
    reject?: string;
    port?: number;
    emailTemplateType?: string;
}
