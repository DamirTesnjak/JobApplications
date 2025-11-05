import { connectToDB } from '../utils/dbConfig/dbConfig';
import { IEmailTemplateSchema } from '../utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function getEmailTemplate(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.injector);
            const Model = await connectToDB(
                DATABASES.emailTemplates,
            ) as Model<IEmailTemplateSchema>;

            if (!Model) {
                console.log(
                    'ERROR_GET_EMAIL_TEMPLATE: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            const emailTemplate = await Model?.findById(req.id);
            if (!emailTemplate) {
                return res.status(500).json({
                    errorMessage: translation("emailTemplateNotFound"),
                    error: true,
                });
            }
            return res.status(200).json({
                successMessage: 'Email template found',
                data: {
                    id: emailTemplate._id,
                    emailType: emailTemplate.emailType,
                    emailText: emailTemplate.emailText,
                    companyLogo: emailTemplate.companyLogo,
                },
                success: true,
            });
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
    catch (error) {
        console.error('ERROR_GET_EMAIL_TEMPLATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
