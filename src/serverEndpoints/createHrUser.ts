import { Model, Types } from 'mongoose';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import checkFormValidation from '../utils/utilsServer/checkFormValidation';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { uploadFile } from '../utils/uploadFile/uploadFile';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { DATABASES, EMAIL_TYPE, FILE_TYPE } from '../constants/constants';
import { ICompanyEmailSettingsSchema } from '../utils/dbConfig/models/companyEmailSettingsModel';
import { useTranslation } from '../utils/translation/useTranslation';

export interface ISendEmail {
    email: IHrUserSchema['email'];
    emailType: string;
    userId: Types.ObjectId;
}

const sendEmail = async ({ email, emailType, userId }: ISendEmail) => {
    // create a hashed token
    const translation = useTranslation('serverAction');
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

    if (!Model) {
        console.log('ERROR_SEND_EMAIL: Error with connecting to the database!');
        return {
            errorMessage: translation('somethingWentWrong'),
            error: true,
        };
    }

    if (emailType === EMAIL_TYPE.verify && Model) {
        await Model.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
        });
    } else if (emailType === EMAIL_TYPE.reset && Model) {
        await Model.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
    }

    const companyEmailConfigsModel = await connectToDB(
        DATABASES.companyEmailConfigs,
    ) as Model<ICompanyEmailSettingsSchema>;

    if (!companyEmailConfigsModel) {
        console.log(
            'ERROR_GET_CREATE_USER_SEND_EMAIL_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!',
        );
        return {
            errorMessage: translation('somethingWentWrong'),
            error: true,
        };
    }

    const companyEmailConfiguration = await companyEmailConfigsModel?.find({});
    if (!companyEmailConfiguration || companyEmailConfiguration.length === 0) {
        console.log(
            'ERROR_GET_CREATE_USER_EMAIL_COMPANY_EMAIL_CONFIGURATION: Cannot find email config configuration!',
        );
        return {
            errorMessage: 'Company email configuration not found!',
            error: true,
        };
    }

    const transport = nodemailer.createTransport({
        host: companyEmailConfiguration[0].emailHost,
        port: companyEmailConfiguration[0].port,
        auth: {
            user: companyEmailConfiguration[0].username,
            pass: companyEmailConfiguration[0].password,
        },
    });

    const mailOptions = {
        from: 'corporateEmail@gmail.com',
        to: email,
        subject:
            emailType === EMAIL_TYPE.verify
                ? 'Verify your email'
                : 'Reset your password',
        html: `<p>
            Click <a href="${process.env['DOMAIN']}/verifyemail?token=${hashedToken}">here</a> to ${emailType === EMAIL_TYPE.verify ? 'Verify your email!' : 'Reset your password'} 
            or copy and paste the link below in your browser. <br> ${process.env['DOMAIN']}/verifyemail?token=${hashedToken}
            </p>`,
    };

    const emailSent = await transport.sendMail(mailOptions);

    if (!emailSent) {
        console.log(
            'ERROR_GET_CREATE_USER_SEND_EMAIL_COMPANY_EMAIL_CONFIGURATION: Error with sending an email!',
        );
        return {
            errorMessage: translation("cannotSendAnEmailToYou"),
            error: true,
        }
    }

    return {
        success: true,
    }
};

export const createHrUser = async (req: any, res: any) => {
    try {
        const translation = useTranslation('serverAction');
        const formData = req.body.formData;
        const formDataObject = getFormDataObject(formData);

        // Return early if the form data is invalid
        const { errorFieldValidation, error, prevStateFormData } =
            await checkFormValidation({
                formData,
                formDataObject,
                errorMessage: 'ERROR_CREATE_HR_USER: inputField validation error',
                skipFileUploadValidation: false,
            });

        if (error) {
            return {
                errorFieldValidation,
                error,
                prevState: prevStateFormData,
            };
        }

        const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;
        if (!Model) {
            console.log('ERROR_CREATE_HR_USER: Error with connecting to the database!');
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
                prevState: formDataObject,
            });
        }
        // check if user already exists
        const hrUser = await Model.findOne({ email: formDataObject['email'] });
        if (hrUser) {
            return res.status(500).json({
                errorMessage: translation("userAlreadyExists"),
                error: true,
                prevState: formDataObject,
            });
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(formDataObject['password']!, salt);
        const uploadedProfilePictureFile = await uploadFile(
            formData,
            FILE_TYPE.image,
        );

        if (!uploadedProfilePictureFile) {
            return {
                errorMessage: 'Please upload a picture!',
                error: true,
                prevState: formDataObject,
            };
        }

        const newUser = new Model({
            profilePicture: uploadedProfilePictureFile,
            name: formDataObject['name'],
            surname: formDataObject['surname'],
            phoneNumber: formDataObject['phoneNumber'],
            email: formDataObject['email'],
            companyName: formDataObject['companyName'],
            username: formDataObject['username'],
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        if (savedUser !== newUser) {
            console.log(
                'ERROR_CREATE_HR_USER: Error with saving new candidate to the database!',
            );
            return res.status(500).json({
                errorMessage: translation("cannotCreateUser"),
                error: true,
                prevState: formDataObject,
            });
        }

        // send verification email
        const messageId = await sendEmail({
            email: formDataObject['email'] as IHrUserSchema['email'],
            emailType: EMAIL_TYPE.verify,
            userId: savedUser._id,
        });

        if (!messageId) {
            console.log('ERROR_CREATE_HR_USER: Error with sending confirmation email!');
            return res.status(500).json({
                errorMessage: translation("somethingWentWrong"),
                error: true,
                prevState: formDataObject,
            });
        }

        return {
            successMessage: translation("userCreated"),
            success: true,
            prevState: formDataObject,
        };
    } catch (error) {
        console.error('ERROR_CREATE_HR_USER:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
};
