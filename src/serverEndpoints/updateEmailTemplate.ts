import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { IEmailTemplateSchema } from '../utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from "../constants/constants";
import { useTranslation } from '../utils/translation/useTranslation';

export async function updateEmailTemplate(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.locale);
            const formData = req.body.formData;
            const injector = req.body.locale
            const formDataObject = getFormDataObject(formData);

            // Return early if the form data is invalid
            const { errorFieldValidation, error, prevStateFormData } = await checkFormValidation({
                formData,
                formDataObject,
                errorMessage: 'ERROR_CHECK_EMAIL_TEMPLATE: inputField validation error',
                injector
            })

            if (error) {
                return res.status(500).json({
                    errorFieldValidation,
                    error,
                    prevState: prevStateFormData,
                });
            }

            const Model = await connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;

            if (!Model) {
                console.log('ERROR_UPDATE_EMAIL_TEMPLATE: Error with connecting to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                    prevState: formDataObject,
                });
            }
            // check if user already exists
            const emailTemplate = await Model.findById(formDataObject['id']);
            if (emailTemplate) {
                emailTemplate.emailType = formDataObject['emailType'] as string;
                emailTemplate.emailText = formDataObject['emailText'] as string;
            }

            const savedEmailTemplate = await emailTemplate?.save();
            if (!savedEmailTemplate) {
                console.log('ERROR_UPDATE_EMAIL_TEMPLATE: Error with saving to the database!');
                return res.status(500).json({
                    errorMessage: translation("cannotSaveChanges"),
                    error: true,
                    prevState: formDataObject,
                });
            }
            return res.status(200).json({
                successMessage: translation("savedChanges"),
                success: true,
                prevState: formDataObject,
            });
        }
    } catch (error) {
        console.error('ERROR_UPDATE_EMAIL_TEMPLATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}