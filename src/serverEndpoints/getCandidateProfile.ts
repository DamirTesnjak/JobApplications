import { Model } from '../utils/mongooseImport/mongooseImport';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { ICandidateSchema } from '../utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function getCandidateProfile(req: any, res: any) {
    try {
        const translation = useTranslation('serverAction');
        const Model = await connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

        if (!Model) {
            console.log(
                'ERROR_GET_CANDIDATE_PROFILE: Error with connecting to the database!',
            );
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
            });
        }

        const candidate = await Model?.findById(req.id);
        if (!candidate) {
            return res.status(500).json({
                errorMessage: translation("candidateFound"),
                error: true,
            });
        }
        return res.status(200).json({
            successMessage: 'Candidate found',
            data: {
                id: candidate._id,
                profilePicture: candidate.profilePicture,
                name: candidate.name,
                surname: candidate.surname,
                contact: candidate.contact,
                curriculumVitae: candidate.curriculumVitae,
                status: candidate.status,
            },
            success: true,
        });
    } catch (error) {
        console.error('ERROR_GET_CANDIDATE_PROFILE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
