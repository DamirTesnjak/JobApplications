import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getDataFromToken } from '../utils/getDataFromToken/getDataFromToken';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function getHrUserProfile(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.injector);
            const tokenData = getDataFromToken(req);

            const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

            if (!Model) {
                console.log('ERROR_GET_HR_PROFILE: Error with connecting to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            if (!tokenData) {
                console.log('WARNING_GET_HR_PROFILE: Token is not found!')
                return res.status(200).json({
                    successMessage: '',
                    success: true,
                });
            }

            const user = await Model?.findOne({ id: tokenData['id'] }).select('-password');
            if (!user) {
                return res.status(500).json({
                    errorMessage: translation("userNotFound"),
                    error: true,
                });
            }
            return res.status(200).json({
                successMessage: 'User found',
                data: {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    phoneNumber: user.phoneNumber,
                    companyName: user.companyName,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    username: user.username,
                },
                success: true,
            });
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
    catch (error) {
        console.error('ERROR_GET_EMAIL_TEMPLATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
