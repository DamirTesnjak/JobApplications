import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { uploadFile } from '../utils/uploadFile/uploadFile';
import { DATABASES, FILE_TYPE } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function createEmailTemplate(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.locale);
            const formData = req.body.formData;
            const injector = req.body.locale
            const formDataObject = getFormDataObject(formData);

            // Return early if the form data is invalid
            const { errorFieldValidation, error, prevStateFormData } =
                await checkFormValidation({
                    formData,
                    formDataObject,
                    errorMessage: 'ERROR_UPDATE_CANDIDATE: inputField validation error',
                    injector
                });

            if (error) {
                return res.status(500).json({
                    errorFieldValidation,
                    error,
                    prevState: prevStateFormData,
                });
            }

            const Model = await connectToDB(DATABASES.emailTemplates);

            if (!Model) {
                console.log(
                    'ERROR_CREATE_EMAIL_TEMPLATE: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                    prevState: formDataObject,
                });
            }

            const companyLogoPicture = await uploadFile(formData, FILE_TYPE.image);

            const newEmailTemplate = new Model({
                emailType: formDataObject['emailType'],
                emailText: formDataObject['emailText'],
                companyLogo: companyLogoPicture,
            });

            const savedEmailTemplate = await newEmailTemplate.save();

            if (savedEmailTemplate !== newEmailTemplate) {
                console.log(
                    'ERROR_CREATE_EMAIL_TEMPLATE: Error with saving new email template to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("cannotSaveChanges"),
                    error: true,
                    prevState: formDataObject,
                });
            }
            return res.status(200).json({
                successMessage: translation('savedChanges'),
                success: true,
                prevState: formDataObject,
            });
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    } catch (error) {
        console.error('ERROR_CREATE_EMAIL_TEMPLATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
