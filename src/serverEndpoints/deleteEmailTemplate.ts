import { Model } from 'mongoose';
import { DATABASES } from "../constants/constants";
import { connectToDB } from "../utils/dbConfig/dbConfig";
import { IEmailTemplateSchema } from "../utils/dbConfig/models/emailTemplateModel";
import { getFormDataObject } from "../utils/formValidation/getFormDataObject";

export async function deleteEmailTemplate(req: any, res: any) {
    try {
        const formDataObject = getFormDataObject(req.body.formData);
        const Model = await connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;

        if (!Model) {
            console.log(
                'ERROR_DELETE_EMAIL_TEMPLATE: Error with connecting to the database!',
            );
            return res.status(500).json({
                errorMessage: 'Something went wrong! Cannot connect to database!',
                error: true,
            });
        }

        // check if user already exists
        const emailTemplate = await Model.findById(formDataObject.id);
        const deletedEmailTemplate = await emailTemplate?.deleteOne();

        if (!deletedEmailTemplate) {
            console.log(
                'ERROR_DELETE_EMAIL_TEMPLATE: Error with deleting the email template from the database!',
            );
            return res.status(500).json({
                errorMessage: "Something went wrong! Cannot delete email template!",
                error: true,
            });
        }

        return res.status(200).json({
            successMessage: "Email template deleted!",
            success: true,
        });
    } catch (error) {
        console.error('ERROR_DELETE_EMAIL_TEMPLATE:', error);
        return res.status(500).json({
            errorMessage: 'Unexpected error occurred',
            error: true,
        });
    }
}