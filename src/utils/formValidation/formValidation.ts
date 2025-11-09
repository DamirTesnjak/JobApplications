import { getFormDataObject } from './getFormDataObject';
import { getFormValidationSchema } from './getFormValidationSchema';

export async function formValidation(locale: string, formData: FormData, skipFileUploadValidation?: boolean) {
    const formDataObject = getFormDataObject(formData);
    const formValidationSchema = await getFormValidationSchema(locale, formDataObject, skipFileUploadValidation);

    return formValidationSchema.safeParse(formDataObject);
}
