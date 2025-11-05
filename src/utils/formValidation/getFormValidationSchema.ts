import { z, ZodObject, ZodRawShape, ZodString } from 'zod';
import { IFormDataType } from './types/formDataType';
import { useTranslation } from '../translation/useTranslation';

export async function getFormValidationSchema(
    injector: any,
    formDataObject: IFormDataType,
    skipFileUploadValidation?: boolean,
) {
    const translation = useTranslation("formValidation", injector);
    const fieldsKeys = Object.keys(formDataObject);
    const schemaShape: {
        [x: string]: ZodString | ZodObject<ZodRawShape>;
    } = {};

    const setSchemaField = (field: string) => {
        const fieldType = typeof formDataObject[field];
        if (
            fieldType === 'string' &&
            field !== 'password' &&
            field !== 'email' &&
            field !== 'file' &&
            !field.includes('$')
        ) {
            schemaShape[field] = z
                .string()
                .min(1, { message: translation("fieldRequired") });
        }
        if (field === 'password') {
            schemaShape[field] = z
                .string()
                .min(10, { message: translation('mustBe10orMoreCharactersLong') });
        }
        if (field === 'email') {
            schemaShape[field] = z
                .string()
                .min(1, { message: translation("fieldRequired") })
                .email({ message: translation("invalidEmailAddress") });
        }
        if (
            (field === 'file' || field === 'profilePicture') &&
            !skipFileUploadValidation
        ) {
            schemaShape[field] = z.object({
                size: z.number(),
                type: z.string(),
                name: z.string().refine((val) => val !== 'undefined', {
                    message: translation("fieldRequired"),
                }),
                lastModified: z.number(),
            });
        }
    };

    for (const field in fieldsKeys) {
        setSchemaField(fieldsKeys[field]);
    }

    return z.object(schemaShape);
}
