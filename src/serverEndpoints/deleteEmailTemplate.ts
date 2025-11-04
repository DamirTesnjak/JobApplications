import { Model } from '../utils/mongooseImport/mongooseImport';
import { DATABASES } from "../constants/constants";
import { connectToDB } from "../utils/dbConfig/dbConfig";
import { IEmailTemplateSchema } from "../utils/dbConfig/models/emailTemplateModel";
import { getFormDataObject } from "../utils/formValidation/getFormDataObject";
import { useTranslation } from '../utils/translation/useTranslation';

export async function deleteEmailTemplate(req: any, res: any) {
    try {
        const translation = useTranslation('serverAction');
        const formDataObject = getFormDataObject(req.body.formData);
        const Model = await connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;

        if (!Model) {
            console.log(
                'ERROR_DELETE_EMAIL_TEMPLATE: Error with connecting to the database!',
            );
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
            });
        }

        // check if user already exists
        const emailTemplate = await Model.findById(formDataObject['id']);
        const deletedEmailTemplate = await emailTemplate?.deleteOne();

        if (!deletedEmailTemplate) {
            console.log(
                'ERROR_DELETE_EMAIL_TEMPLATE: Error with deleting the email template from the database!',
            );
            return res.status(500).json({
                errorMessage: translation("cannotSaveChanges"),
                error: true,
            });
        }

        return res.status(200).json({
            successMessage: translation("emailDeleted"),
            success: true,
        });
    } catch (error) {
        console.error('ERROR_DELETE_EMAIL_TEMPLATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}