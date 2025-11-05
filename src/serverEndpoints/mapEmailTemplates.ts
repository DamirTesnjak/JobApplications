import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { IMappedEmailTemplates } from '../utils/dbConfig/models/mappedEmailTemplates';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function mapEmailTemplates(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.injector);
            const formData = req.body.formData;
            const formDataObject = getFormDataObject(formData);

            const Model = await connectToDB(
                DATABASES.mappedEmailTemplates,
            ) as Model<IMappedEmailTemplates>;

            if (!Model) {
                console.log(
                    'ERROR_MAP_EMAIL_TEMPLATES: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWrong"),
                    error: true,
                });
            }

            const mappedEmailTemplatesSettings = await Model.find({});
            if (mappedEmailTemplatesSettings.length > 0) {
                console.log('Found mapped email templates! Updating with new values');

                const mappedEmailTemplateSetting = await Model.findById(
                    mappedEmailTemplatesSettings[0]._id,
                );

                if (mappedEmailTemplateSetting) {
                    mappedEmailTemplateSetting.archive = formDataObject['archive'] as string;
                    mappedEmailTemplateSetting.hire = formDataObject['hire'] as string;
                    mappedEmailTemplateSetting.reject = formDataObject['reject'] as string;
                    mappedEmailTemplateSetting.fire = formDataObject['fire'] as string;
                }
                const savedMappedEmailSettings = await mappedEmailTemplateSetting?.save();
                if (!savedMappedEmailSettings) {
                    console.log(
                        'ERROR_UPDATE_MAP_EMAIL_TEMPLATES: Error with updating mapped email templates to the database!',
                    );
                    return res.status(500).json({
                        errorMessage: translation("cannotSaveChanges"),
                        error: true,
                    });
                }
                return res.status(200).json({
                    successMessage: translation("newMappedEmailSettingsCreatedSuccessfully"),
                    success: true,
                });
            }

            const newMappedEmailSettings = new Model({
                archive: formDataObject['archive'],
                hire: formDataObject['hire'],
                reject: formDataObject['reject'],
                fire: formDataObject['fire'],
            });

            const savedMappedEmailSettings = await newMappedEmailSettings.save();

            if (savedMappedEmailSettings !== newMappedEmailSettings) {
                console.log(
                    'ERROR_MAP_EMAIL_TEMPLATES: Error with saving new mapped email templates to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("cannotSaveChanges"),
                    error: true,
                });
            }
            return res.status(200).json({
                successMessage: 'New mapped email settings created successfully',
                success: true,
            });
        }
    } catch (error) {
        console.error('ERROR_MAP_EMAIL_TEMPLATES:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });

    }
}
