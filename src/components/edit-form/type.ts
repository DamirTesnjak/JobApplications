export interface IEditFormProps {
    id?: string;
    serverAction?: (
        prevState: IPrevState,
        formData: FormData,
    ) => Promise<Partial<IPrevState>>;
    stateModel:
    | typeof initialStateCandidate
    | typeof initialStateHrUser
    | typeof initialStateCompanyEmailConfigs;
    storeReducerName: string;
    editable?: boolean;
    newProfile?: boolean;
    showUploadCVButton?: boolean;
    showUploadPictureButton?: boolean;
    hrForm?: boolean;
}