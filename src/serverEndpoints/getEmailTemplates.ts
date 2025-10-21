import { Model } from 'mongoose';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { IEmailTemplateSchema } from '../utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function getEmailTemplates(req: any, res: any) {
    try {
        const translation = useTranslation('en', 'serverAction');
        const Model = await connectToDB(
            DATABASES.emailTemplates,
        ) as Model<IEmailTemplateSchema>;

        if (!Model) {
            console.log(
                'ERROR_GET_EMAIL_TEMPLATES: Error with connecting to the database!',
            );
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
            });
        }

        const emailTemplates: IEmailTemplateSchema[] = await Model.find({});

        if (!emailTemplates) {
            return res.status(500).json({
                errorMessage: translation("cannotFindAnyEmailTemplates"),
                error: true,
            });
        }

        if (emailTemplates.length === 0) {
            return res.status(500).json({
                errorMessage: translation("noEmailTemplatesFound"),
                error: true,
            });
        }
        return res.status(200).json({
            successMessage: 'Fetching data successful!',
            success: true,
            emailTemplates,
        });
    }
    catch (error) {
        console.error('ERROR_GET_EMAIL_TEMPLATES:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
