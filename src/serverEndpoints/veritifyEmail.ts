import { Model } from '../utils/mongooseImport/mongooseImport';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function verifyEmail(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;
            const translation = useTranslation('serverAction', req.body.locale);
            const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

            if (!Model) {
                console.log('ERROR_VERIFY_EMAIL: Error with connecting to the database!');
                return res.status(500).json({
                    error: translation('somethingWentWrong'),
                });
            }

            const user = await Model?.findOne({
                verifyToken: req.token,
                verifyTokenExpiry: { $gt: Date.now() },
            });

            if (!user) {
                return { error: 'Invalid token' };
            }

            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            const updatedUser = await user.save();

            if (updatedUser !== user) {
                console.log('ERROR_VERIFY_EMAIL: Error with verifying the email!');
                return res.status(500).json({
                    error: translation('somethingWentWrong'),
                });
            }
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    } catch (error) {
        console.error('ERROR_VERIFY_EMAIL:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
