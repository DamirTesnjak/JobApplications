import nodemailer from 'nodemailer';
import { connectToDB } from '../utils/dbConfig/dbConfig';
import { getFormDataObject } from '../utils/formValidation/getFormDataObject';
import { IMappedEmailTemplates } from '../utils/dbConfig/models/mappedEmailTemplates';
import { ICandidateSchema } from '../utils/dbConfig/models/candidateModel.js';
import { ICompanyEmailSettingsSchema } from '../utils/dbConfig/models/companyEmailSettingsModel';
import { IEmailTemplateSchema } from '../utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '../constants/constants';
import { getDataFromToken } from '../utils/getDataFromToken/getDataFromToken';
import { IHrUserSchema } from '../utils/dbConfig/models/hrUserModel';
import { useTranslation } from '../utils/translation/useTranslation';

export async function sendEmail(req: any, res: any) {
    try {
        if (typeof window === "undefined") {
            const mongoose = await import('mongoose');
            type Model<T = any> = typeof mongoose.Model<T>;

            const formData = req.body;

            const translation = useTranslation('serverAction', formData.locale);
            const formDataObject = getFormDataObject(formData);

            const { emailTemplateType } = formDataObject;

            const mappedEmailTemplatesModel = await connectToDB(
                DATABASES.mappedEmailTemplates,
            ) as Model<IMappedEmailTemplates>;

            if (!mappedEmailTemplatesModel) {
                console.log(
                    'ERROR_GET_SEND_EMAIL_MAPPED_EMAIL_TEMPLATES: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            const mappedEmailTemplates = await mappedEmailTemplatesModel?.find({});
            if (!mappedEmailTemplates) {
                return res.status(500).json({
                    errorMessage: translation("noEmailTemplatesFound"),
                    error: true,
                });
            }

            const candidatesModel = await connectToDB(
                DATABASES.candidates,
            ) as Model<ICandidateSchema>;

            if (!candidatesModel) {
                console.log(
                    'ERROR_GET_SEND_EMAIL_PROFILE: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });

            }

            const candidate = await candidatesModel?.findById(formDataObject["id"]);

            if (!candidate) {
                return res.status(500).json({
                    errorMessage: translation("candidateNotFound"),
                    error: true,
                });
            }

            if (emailTemplateType === 'archive') {
                candidate.status.archived = true;
                candidate.status.rejected = false;
                candidate.status.employed = false;
                candidate.status.fired = false;
            }

            if (emailTemplateType === 'reject') {
                candidate.status.archived = false;
                candidate.status.rejected = true;
                candidate.status.employed = false;
                candidate.status.fired = false;
            }

            if (emailTemplateType === 'hire') {
                candidate.status.archived = false;
                candidate.status.rejected = false;
                candidate.status.employed = true;
                candidate.status.fired = false;
            }

            if (emailTemplateType === 'fire') {
                candidate.status.archived = false;
                candidate.status.rejected = false;
                candidate.status.employed = false;
                candidate.status.fired = true;
            }

            const savedCandidate = await candidate?.save();
            if (!savedCandidate) {
                console.log(
                    'ERROR_GET_SEND_EMAIL_ERROR_UPDATE_CANDIDATE: Error with updating the candidate to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("cannotSaveChanges"),
                    error: true,
                    prevState: formDataObject,
                });
            }

            const companyEmailConfigsModel = await connectToDB(
                DATABASES.companyEmailConfigs,
            ) as Model<ICompanyEmailSettingsSchema>;

            if (!companyEmailConfigsModel) {
                console.log(
                    'ERROR_GET_SEND_EMAIL_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            const companyEmailConfiguration = await companyEmailConfigsModel?.find({});
            if (!companyEmailConfiguration || companyEmailConfiguration.length === 0) {
                return res.status(500).json({
                    errorMessage: translation("companyEmailConfigurationNotFound"),
                    error: true,
                });
            }

            const emailTemplateModel = await connectToDB(
                DATABASES.emailTemplates,
            ) as Model<IEmailTemplateSchema>;

            if (!emailTemplateModel) {
                console.log(
                    'ERROR_GET_SEND_EMAIL_PROFILE_EMAIL_TEMPLATE: Error with connecting to the database!',
                );
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            const emailType = mappedEmailTemplates[0][emailTemplateType!];
            const emailTemplate = await emailTemplateModel?.find({
                emailType: emailType,
            });

            if (!emailTemplate || (emailTemplate && emailTemplate.length === 0)) {
                return res.status(500).json({
                    errorMessage: translation("emailTemplateNotFound"),
                    error: true,
                });
            }

            const tokenData = getDataFromToken(req);

            if (!tokenData) {
                console.log('WARNING_GET_HR_PROFILE: Token is not found!')
                return {
                    successMessage: '',
                    success: true,
                }
            }

            const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

            if (!Model) {
                console.log('ERROR_GET_SEND_EMAIL_GET_HR_PROFILE: Error with connecting to the database!');
                return res.status(500).json({
                    errorMessage: translation("somethingWentWrong"),
                    error: true,
                });
            }

            const user = await Model?.findOne({ id: tokenData["id"] }).select('-password');
            if (!user) {
                return res.status(500).json({
                    errorMessage: translation("userNotFound"),
                    error: true,
                });
            }

            const transport = nodemailer.createTransport({
                host: companyEmailConfiguration[0].emailHost,
                port: companyEmailConfiguration[0].port,
                auth: {
                    user: companyEmailConfiguration[0].username,
                    pass: companyEmailConfiguration[0].password,
                },
            });

            const emailText = emailTemplate[0].emailText
                .replaceAll('[CANDIDATE_NAME]', `${candidate.name} ${candidate.surname}`)
                .replaceAll('[COMPANY_NAME]', companyEmailConfiguration[0].companyName)
                .replaceAll('[YOUR_NAME]', `${user.name} ${user.surname}`);

            const mailOptions = {
                from: companyEmailConfiguration[0].email,
                to: candidate.contact.email,
                subject: translation('jobStatus'),
                html: emailText,
            };

            await transport.sendMail(mailOptions);

            return res.status(200).json({ successMessage: translation("emailSentToTheCandidate"), success: true });
        }
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    } catch (error) {
        console.error('ERROR_SEND_EMAIL:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });

    }
}
