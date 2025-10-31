import { Model } from 'mongoose';
import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { ICandidateSchema } from '../utils/dbConfig/models/candidateModel.js';
import { uploadFile } from '../utils/uploadFile/uploadFile';
import {
    DATABASES,
    FILE_TYPE,
} from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function createCandidate(req: any, res: any) {
    try {
        const translation = useTranslation('serverAction');
        const formData = req.body.formData;
        const formDataObject = getFormDataObject(formData);
        // Return early if the form data is invalid
        const { errorFieldValidation, error, prevStateFormData } =
            await checkFormValidation({
                formData,
                formDataObject,
                errorMessage: 'ERROR_CREATE_CANDIDATE: inputField validation error',
            });

        if (error) {
            return res.status(500).json({
                errorFieldValidation,
                error,
                prevState: prevStateFormData,
            });
        }

        const Model = await connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

        if (!Model) {
            console.log(
                'ERROR_CREATE_CANDIDATE: Error with connecting to the database!',
            );
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
                prevState: formDataObject,
            });
        }

        const candidateFound = await Model.findOne({
            'contact.email': formDataObject['email'],
        });
        if (candidateFound) {
            return res.status(500).json({
                errorMessage: translation("candidateAlreadyExists"),
                error: true,
                prevState: formDataObject,
            });
        }

        const uploadedProfilePictureFile = await uploadFile(
            formData,
            FILE_TYPE.image,
        );

        const uploadedCurriculumVitaeFile = await uploadFile(
            formData,
            FILE_TYPE.file,
        );

        const newCandidate = new Model({
            profilePicture: uploadedProfilePictureFile,
            name: formDataObject['name'],
            surname: formDataObject['surname'],
            contact: {
                address: formDataObject['address'],
                city: formDataObject['city'],
                zipCode: formDataObject['zipCode'],
                country: formDataObject['country'],
                email: formDataObject['email'],
                phoneNumber: formDataObject['phoneNumber'],
                linkedIn: formDataObject['linkedIn'],
            },
            curriculumVitae: uploadedCurriculumVitaeFile,
            status: {
                archived: true,
                employed: false,
                rejected: false,
            },
        });

        const savedCandidate = await newCandidate.save();

        if (savedCandidate !== newCandidate) {
            console.log(
                'ERROR_CREATE_CANDIDATE: Error with saving new candidate to the database!',
            );
            return res.status(500).json({
                errorMessage: translation("cannotSaveChanges"),
                error: true,
                prevState: formDataObject,
            });
        }
        return res.status(500).json({
            successMessage: translation("savedChanges"),
            success: true
        });
    }
    catch (error) {
        console.error('ERROR_CREATE_CANDIDATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
