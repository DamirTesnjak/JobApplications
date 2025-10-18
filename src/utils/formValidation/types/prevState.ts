import { IFormDataObject } from '../getFormDataObject';
import { IFormDataType } from './formDataType';

export interface IPrevState {
    errorMessage?: string;
    error?: boolean;
    successMessage?: string;
    success?: boolean;
    errorFieldValidation?: { [p: string]: string };
    prevState?: IFormDataObject | IFormDataType;
}
