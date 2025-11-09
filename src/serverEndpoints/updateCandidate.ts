import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { uploadFile } from '../utils/uploadFile/uploadFile';
import { ICandidateSchema } from '../utils/dbConfig/models/candidateModel.js';
import { DATABASES, FILE_TYPE } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function updateCandidate(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const locale = req.body.locale
            const translation = useTranslation('serverAction', locale);
            const formData = req.body.formData;
            const formDataObject = getFormDataObject(formData);

            // Return early if the form data is invalid
            const { errorFieldValidation, error, prevStateFormData } =
                await checkFormValidation({
                    formData,
                    formDataObject,
                    errorMessage: 'ERROR_UPDATE_CANDIDATE: inputField validation error',
                    skipFileUploadValidation: true,
                    locale
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
                    'ERROR_UPDATE_CANDIDATE: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                    prevState: formDataObject,
                });
            }
            // check if user already exists
            const candidate = await Model.findById(formDataObject['id']);
            if (candidate) {
                const uploadedProfilePictureFile = await uploadFile(
                    formData,
                    FILE_TYPE.image,
                );
                const uploadedCurriculumVitaeFile = await uploadFile(
                    formData,
                    FILE_TYPE.file,
                );

                candidate.profilePicture =
                    uploadedProfilePictureFile || candidate.profilePicture;
                candidate.name = formDataObject['name'] as string;
                candidate.surname = formDataObject['surname'] as string;
                candidate.contact = <ICandidateSchema['contact']>{
                    address: formDataObject['address'],
                    city: formDataObject['city'],
                    zipCode: formDataObject['zipCode'],
                    country: formDataObject['country'],
                    email: formDataObject['email'],
                    phoneNumber: formDataObject['phoneNumber'],
                    linkedIn: formDataObject['linkedIn'],
                };
                candidate.curriculumVitae =
                    uploadedCurriculumVitaeFile || candidate.curriculumVitae;
                candidate.status = {
                    archived: formDataObject['archived'] === 'on',
                    employed: formDataObject['employed'] === 'on',
                    rejected: formDataObject['rejected'] === 'on',
                    fired: formDataObject['fired'] === 'on',
                };
            }

            const savedCandidate = await candidate?.save();
            if (!savedCandidate) {
                console.log(
                    'ERROR_UPDATE_CANDIDATE: Error with updating the candidate to the database!',
                );
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
        console.error('ERROR_UPDATE_CANDIDATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}