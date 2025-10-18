export const STORE_REDUCER_NAME = {
    hrUser: 'hrUser',
    candidate: 'candidate',
    companyEmailConfigs: 'companyEmailConfigs',
};

export interface IDatabaseType {
    [x: string]: string;
    candidates: 'candidates';
    hrUsers: 'hrUsers';
    emailTemplates: 'emailTemplates';
    companyEmailConfigs: 'companyEmailConfigs';
    mappedEmailTemplates: 'mappedEmailTemplates';
}

export const DATABASES: IDatabaseType = {
    candidates: 'candidates',
    hrUsers: 'hrUsers',
    emailTemplates: 'emailTemplates',
    companyEmailConfigs: 'companyEmailConfigs',
    mappedEmailTemplates: 'mappedEmailTemplates',
};

export const enum DATABASES_ENUM {
    candidates = 'candidates',
    hrUsers = 'hrUsers',
    emailTemplates = 'emailTemplates',
}

export const EMAIL_TYPE = {
    verify: 'VERIFY',
    reset: 'RESET',
};

export const FILE_TYPE = {
    image: 'profilePicture',
    file: 'file',
};

export interface IHTMLProps {
    type: string;
    startTag: string;
    endTag: string;
}

export interface IEditTextButton {
    [x: string]: IHTMLProps;
    paragraph: IHTMLProps;
    italic: IHTMLProps;
    strong: IHTMLProps;
    underline: IHTMLProps;
    newline: IHTMLProps;
    link: IHTMLProps;
    superscript: IHTMLProps;
    subscript: IHTMLProps;
    targetPersonFullName: IHTMLProps;
    hrUserFullNameTemplate: IHTMLProps;
    companyNameTemplate: IHTMLProps;
}

export const EDIT_TEXT_BUTTON: IEditTextButton = {
    paragraph: { type: 'paragraph', startTag: '<p>', endTag: '</p>' },
    italic: { type: 'italic', startTag: '<i>', endTag: '</i>' },
    strong: { type: 'strong', startTag: '<strong>', endTag: '</strong>' },
    underline: { type: 'underline', startTag: '<u>', endTag: '</u>' },
    newline: { type: 'newline', startTag: '<br>', endTag: '' },
    link: { type: 'link', startTag: '<a href="">', endTag: '</a>' },
    superscript: { type: 'superscript', startTag: '<sup>', endTag: '</sup>' },
    subscript: { type: 'subscript', startTag: '<sub>', endTag: '</sub>' },
    targetPersonFullName: {
        type: 'targetPersonFullName',
        startTag: '[CANDIDATE_NAME]',
        endTag: '',
    },
    hrUserFullNameTemplate: {
        type: 'hrUserFullNameTemplate',
        startTag: '[YOUR_NAME]',
        endTag: '',
    },
    companyNameTemplate: {
        type: 'companyNameTemplate',
        startTag: '[COMPANY_NAME]',
        endTag: '',
    },
};

