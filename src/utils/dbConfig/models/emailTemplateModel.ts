import mongoose from 'mongoose';

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

const { Schema } = mongoose;

const emailTemplateSchema = new Schema<IEmailTemplateSchema>({
    id: String,
    emailType: String,
    emailText: String,
    companyLogo: {
        file: {
            name: String,
            data: String,
            contentType: String,
        },
    },
});

export default emailTemplateSchema;
