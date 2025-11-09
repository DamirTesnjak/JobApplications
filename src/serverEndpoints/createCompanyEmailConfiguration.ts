import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { ICompanyEmailSettingsSchema } from '../utils/dbConfig/models/companyEmailSettingsModel';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function createCompanyEmailConfiguration(req: any, res: any) {
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
                    errorMessage: 'ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: inputField validation error',
                    injector
                });

            if (error) {
                return {
                    errorFieldValidation,
                    error,
                    prevState: prevStateFormData,
                };
            }

            const Model = await connectToDB(
                DATABASES.companyEmailConfigs,
            ) as Model<ICompanyEmailSettingsSchema>;

            if (!Model) {
                console.log(
                    'ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                    prevState: formDataObject,
                });
            }

            const companyEmailConfiguration = await Model.find({});
            if (companyEmailConfiguration.length > 0) {
                const emailConfig = await Model.findById(companyEmailConfiguration[0]._id);
                if (emailConfig) {
                    emailConfig.emailHost =
                        formDataObject['emailHost'] as ICompanyEmailSettingsSchema['emailHost'];
                    emailConfig.port =
                        formDataObject['port'] as ICompanyEmailSettingsSchema['port'];
                    emailConfig.username =
                        formDataObject['username'] as ICompanyEmailSettingsSchema['username'];
                    emailConfig.companyName =
                        formDataObject['companyName'] as ICompanyEmailSettingsSchema['companyName'];
                    emailConfig.password =
                        formDataObject['password'] as ICompanyEmailSettingsSchema['password'];
                    emailConfig.email =
                        formDataObject['email'] as ICompanyEmailSettingsSchema['email'];

                    const savedEmailConfig = await emailConfig.save();

                    if (savedEmailConfig !== emailConfig) {
                        console.log(
                            'ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with saving new email configuration to the database!',
                        );
                        return res.status(500).json({
                            errorMessage: translation("cannotSaveChanges"),
                            error: true,
                            prevState: formDataObject,
                        });
                    }
                }

                if (!emailConfig) {
                    console.log(
                        'ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Cannot find company email configuration!',
                    );
                    return res.status(500).json({
                        errorMessage: translation("somethingWentWrong"),
                        error: true,
                        prevState: formDataObject,
                    });
                }

                const savedEmailConfig = await emailConfig.save();
                if (!savedEmailConfig) {
                    console.log(
                        'ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with saving to the database!',
                    );
                    return res.status(500).json({
                        errorMessage: translation("somethingWentWrong"),
                        error: true,
                        prevState: formDataObject,
                    });
                }
            } else {
                const newCompanyEmailConfiguration = new Model({
                    emailHost: formDataObject['emailHost'],
                    port: formDataObject['port'],
                    username: formDataObject['username'],
                    companyName: formDataObject['companyName'],
                    password: formDataObject['password'],
                    email: formDataObject['email'],
                });
                const savedCompanyEmailConfiguration =
                    await newCompanyEmailConfiguration.save();
                if (savedCompanyEmailConfiguration !== newCompanyEmailConfiguration) {
                    console.log(
                        'ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: Error with saving new email configuration to the database!',
                    );
                    return res.status(500).json({
                        errorMessage: translation("somethingWentWrong"),
                        error: true,
                        prevState: formDataObject,
                    });
                }
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
        console.error('ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
