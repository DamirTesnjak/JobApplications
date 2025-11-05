import candidateSchema from './models/candidateModel.js';
import hrUserSchema from './models/hrUserModel';
import emailTemplateSchema from './models/emailTemplateModel';
import companyEmailSettingsSchema from './models/companyEmailSettingsModel';
import mappedEmailTemplates from './models/mappedEmailTemplates';
import { DATABASES } from '../../constants/constants';

export async function connectToDB(database: string) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            const createConnection = mongoose.createConnection;

            const connection = await createConnection(`${process.env["MONGO_URL"]}/${database}`)
                .asPromise();

            if (connection.readyState === 0) {
                return undefined;
            }

            let Model;

            if (database === DATABASES.candidates) {
                Model = connection.model(DATABASES.candidates, candidateSchema);
            }

            if (database === DATABASES.hrUsers) {
                Model = connection.model(DATABASES.hrUsers, hrUserSchema);
            }

            if (database === DATABASES.emailTemplates) {
                Model = connection.model(DATABASES.emailTemplates, emailTemplateSchema);
            }

            if (database === DATABASES.companyEmailConfigs) {
                Model = connection.model(
                    DATABASES.companyEmailConfigs,
                    companyEmailSettingsSchema,
                );
            }

            if (database === DATABASES.mappedEmailTemplates) {
                Model = connection.model(
                    DATABASES.mappedEmailTemplates,
                    mappedEmailTemplates,
                );
            }

            connection.on('connected', () => {
                console.log(`Connected to database ${database} successfully`);
            });

            connection.on('error', (err) => {
                console.log(
                    `Cannot connect to database ${database}! Please make sure MongoDB is running ${err}.`,
                );
            });
            return Model;
        } else {
            return null;
        }
    } catch (err) {
        console.log('Fatal error connecting to database', err);
        return null;
    }
}
