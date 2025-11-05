import { getFormDataObject } from './getFormDataObject';
import { getFormValidationSchema } from './getFormValidationSchema';

export async function formValidation(injector: any, formData: FormData, skipFileUploadValidation?: boolean) {
    const formDataObject = getFormDataObject(formData);
    const formValidationSchema = await getFormValidationSchema(injector, formDataObject, skipFileUploadValidation);

    return formValidationSchema.safeParse(formDataObject);
}
