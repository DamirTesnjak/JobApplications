import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { DATABASES } from '../constants/constants';
import { useTranslation } from '../utils/translation/useTranslation';

export async function loginHrUser(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;

            const formData = req.body;

            const translation = useTranslation('serverAction', formData.locale);
            const formDataObject = getFormDataObject(formData);

            // Return early if the form data is invalid
            const { errorFieldValidation, error, prevStateFormData } =
                await checkFormValidation({
                    formData,
                    formDataObject,
                    errorMessage: 'ERROR_LOGIN_HR_USER: inputField validation error',
                    locale: formData.locale
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
                console.log('ERROR_LOGIN_HR_USER: Error with connecting to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                    prevState: formDataObject,
                });
            }
            // check if user already exists
            const hrUser = await Model.findOne({ username: formDataObject['username'] });
            if (!hrUser) {
                console.log('ERROR_LOGIN_HR_USER: User cannot be found!');
                return res.status(500).json({
                    errorMessage: translation("usernameDoesNotExist"),
                    error: true,
                    prevState: formDataObject,
                });
            }

            // check password
            const validPassword = await bcryptjs.compare(
                formDataObject['password']!,
                hrUser.password,
            );

            if (!validPassword) {
                return res.status(500).json({
                    errorMessage: translation("passwordDoesNotMatch"),
                    error: true,
                    prevState: formDataObject,
                });
            }

            // create token data
            const tokenData = { id: hrUser.id };

            //create token
            const token = await jwt.sign(tokenData, process.env['TOKEN_SECRET']!, {
                expiresIn: '1d',
            });

            res.setHeader('Set-Cookie', `token=${token}; HttpOnly=true`);

            return res.status(200).json({
                successMessage: `Successfully logged in!`,
                success: true,
            });
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
    catch (error) {
        console.error('ERROR_LOGIN_HR_USER:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}
