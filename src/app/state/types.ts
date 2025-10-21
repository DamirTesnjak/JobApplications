export interface ITutorialData {
    mappedCandidates: {
        id: string;
        name: string;
        surname: string;
        profilePicture: {
            file: {
                name: string;
                data: string;
                contentType: string;
            };
        };
        curriculumVitae: {
            file: {
                name: string;
                data: string;
                contentType: string;
            };
        };
        contact: {
            address: string;
            city: string;
            zipCode: string;
            country: string;
            email: string;
            phoneNumber: string;
            linkedIn: string;
        };
        status: {
            archived: boolean;
            employed: boolean;
            rejected: boolean;
        };
    }[];
    emailTemplates: {
        companyLogo: null;
        _id: string;
        emailType: string;
        emailText: string;
        __v: number;
    }[];
    tutorialRunning: boolean;
}

export interface IInitialStateCompanyEmailConfigs {
    id: string;
    emailHost: string;
    port: string;
    email: string;
    username: string;
    companyName: string;
    password: string;
}