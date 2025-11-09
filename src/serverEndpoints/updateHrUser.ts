import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { uploadFile } from '../utils/uploadFile/uploadFile';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { DATABASES, FILE_TYPE } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function updateHrUser(req: any, res: any) {
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
                    errorMessage: 'ERROR_UPDATE_HR_USER: inputField validation error',
                    skipFileUploadValidation: true,
                    injector
                });

            if (error) {
                return res.status(500).json({
                    errorFieldValidation,
                    error,
                    prevState: prevStateFormData,
                });
            }

            const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

            if (!Model) {
                console.log('ERROR_UPDATE_HR_USER: Error with connecting to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                    prevState: formDataObject,
                });
            }
            // check if user already exists
            const hrUser = await Model.findById(formDataObject['id']);
            if (hrUser) {
                const uploadedProfilePictureFile = await uploadFile(
                    formData,
                    FILE_TYPE.image,
                );
                hrUser.profilePicture = uploadedProfilePictureFile || hrUser.profilePicture;
                hrUser.name = formDataObject['name'] as string;
                hrUser.surname = formDataObject['surname'] as string;
                hrUser.phoneNumber = formDataObject['phoneNumber'] as string;
                hrUser.email = formDataObject['email'] as string;
                hrUser.username = formDataObject['username'] as string;
            }

            const savedHrUser = await hrUser?.save();
            if (!savedHrUser) {
                console.log('ERROR_UPDATE_HR_USER: Error with saving to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
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
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    } catch (error) {
        console.error('ERROR_UPDATE_HR_USER:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
