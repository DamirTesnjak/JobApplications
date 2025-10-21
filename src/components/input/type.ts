export interface InputProps {
    label?: string;
    name: string;
    className: 'standard' | 'full' | 'outline' | 'checkbox' | 'uploadButton';
    flow: 'flowRow' | 'flowColumn';
    role?: 'button' | 'radio' | 'checkbox';
    type:
    | 'button'
    | 'file'
    | 'text'
    | 'checkbox'
    | 'password'
    | 'number'
    | 'email'
    | string;
    value?: string | number | string[];
    defaultValue?: string | number | readonly string[] | undefined;
    readOnly?: boolean;
    required?: boolean;
    checked?: boolean;
    errorMessage?: string | null;
}