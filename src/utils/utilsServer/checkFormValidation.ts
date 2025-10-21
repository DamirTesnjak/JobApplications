import { formValidation } from '../formValidation/formValidation';
import { IFormDataType } from '../types/formDataType';

export interface IcheckFormValidationArgs {
    formData: FormData;
    formDataObject: IFormDataType;
    errorMessage: string;
    skipFileUploadValidation?: boolean;
}

export default async function checkFormValidation({
    formData,
    formDataObject,
    skipFileUploadValidation,
}: IcheckFormValidationArgs) {
    const validatedFields = await formValidation(formData, skipFileUploadValidation);

    if (!validatedFields.success) {
        const errorFieldValidation: { [x: string]: string } = {};

        validatedFields.error.errors.forEach((error) => {
            errorFieldValidation[error.path[0]] = error.message;
        });

        return {
            errorFieldValidation,
            error: true,
            prevStateFormData: formDataObject,
        };
    }
    return {
        errorFieldValidation: undefined,
        error: false,
        prevStateFormData: formDataObject,
    };
}
