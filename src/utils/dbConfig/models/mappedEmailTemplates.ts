import mongoose from 'mongoose';

export interface IMappedEmailTemplates {
    id?: string;
    archive: string;
    hire: string;
    reject: string;
    fire: string;
}

const { Schema } = mongoose;
const mappedEmailTemplates = new Schema<IMappedEmailTemplates>({
    id: String,
    archive: String,
    hire: String,
    reject: String,
    fire: String,
});

export default mappedEmailTemplates;
