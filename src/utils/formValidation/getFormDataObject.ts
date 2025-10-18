/* eslint-disable @typescript-eslint/no-explicit-any */
export type IFormDataObject = {
    [x: string]: any;
};

export function getFormDataObject(formData: FormData) {
    const formDataObject: IFormDataObject = {};

    for (const [key, value] of formData) {
        formDataObject[key] = value;
    }
    return formDataObject;
}
