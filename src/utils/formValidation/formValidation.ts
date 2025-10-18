import { getFormDataObject } from './getFormDataObject';
import { getFormValidationSchema } from './getFormValidationSchema';

export async function formValidation(formData: FormData, skipFileUploadValidation?: boolean) {
    const formDataObject = getFormDataObject(formData);
    const formValidationSchema = await getFormValidationSchema(formDataObject, skipFileUploadValidation);

    return formValidationSchema.safeParse(formDataObject);
}
