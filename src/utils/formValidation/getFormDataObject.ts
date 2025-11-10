/* eslint-disable @typescript-eslint/no-explicit-any */
export type IFormDataObject = {
    [x: string]: any;
};

export function getFormDataObject(formData: any) {
    const formDataObject: IFormDataObject = {};

    console.log("formData22222222", formData);

    for (const key in formData) {
        formDataObject[key] = formData[key];
    }
    return formDataObject;
}
