import { connectToDB } from '../utils/dbConfig/dbConfig';
import { ICandidateSchema } from '../utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function getCandidates(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.locale);
            const Model = await connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

            if (!Model) {
                console.log('ERROR_GET_CANDIDATES: Error with connecting to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            const candidates: ICandidateSchema[] = await Model.find({});

            const mappedCandidates = candidates.map((candidate) => ({
                id: candidate._id,
                name: candidate.name,
                surname: candidate.surname,
                profilePicture: {
                    ...candidate.profilePicture,
                    file: {
                        ...candidate.profilePicture.file,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        data: candidate.profilePicture.file.data.toString('base64'),
                    },
                },
                curriculumVitae: {
                    ...candidate.curriculumVitae,
                    file: {
                        ...candidate.curriculumVitae.file,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        data: candidate.curriculumVitae.file.data.toString('base64'),
                    },
                },
                contact: candidate.contact,
                status: candidate.status,
            }));

            if (!candidates) {
                return res.status(500).json({
                    errorMessage: translation("cannotFindAnyCandidates"),
                    error: true,
                });
            }
            if (candidates.length === 0) {
                return res.status(200).json({
                    errorMessage: translation('noCandidatesFound'),
                    error: true,
                });
            }
            return res.status(200).json({
                successMessage: 'Fetching data successful!',
                success: true,
                candidates: mappedCandidates,
            });
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
    catch (error) {
        console.error('ERROR_GET_CANDIDATES:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
