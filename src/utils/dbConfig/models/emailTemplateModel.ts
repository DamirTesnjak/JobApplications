export interface IEmailTemplateSchema {
    id?: string;
    emailType: string;
    emailText: string;
    companyLogo: {
        file: {
            name: string;
            data: string;
            contentType: string;
        };
    };
}
