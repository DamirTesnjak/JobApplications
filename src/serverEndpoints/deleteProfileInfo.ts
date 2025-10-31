import { Model } from 'mongoose';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { ICandidateSchema } from '../utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function deleteProfileInfo(req: any, res: any) {
    try {
        const translation = useTranslation('serverAction');
        const formData = req.body.formData;
        const formDataObject = getFormDataObject(formData);

        const Model = await connectToDB(DATABASES[formDataObject['databaseName']!]) as Model<
            IHrUserSchema | ICandidateSchema
        >;
        if (!Model) {
            console.log('ERROR_DELETE_PROFILE: Error with connecting to the database!');
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
            });
        }
        // check if user already exists
        const profile = await Model.findById(formDataObject['id']);
        const deletedProfile = await profile?.deleteOne();

        if (!deletedProfile) {
            console.log(
                'ERROR_DELETE_PROFILE: Error with deleting the profile from the database!',
            );
            return res.status(500).json({
                errorMessage: translation("cannotSaveChanges"),
                error: true,
            });
        }

        if (DATABASES.hrUsers === DATABASES[formDataObject['databaseName']!]) {
            res.setHeader('Set-Cookie', 'token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
        }

        return res.status(200).json({
            successMessage: 'Changes saved',
            success: true,
        });
    } catch (error) {
        console.error('ERROR_DELETE_PROFILE_INFO:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
