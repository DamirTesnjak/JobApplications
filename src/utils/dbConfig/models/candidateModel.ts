export interface ICandidateSchema {
    _id?: string;
    id?: string;
    profilePicture: {
        file: {
            name: string;
            data: string;
            contentType: string;
        };
    };
    name: string;
    surname: string;
    contact: {
        address: string;
        city: string;
        zipCode: string;
        country: string;
        email: string;
        phoneNumber: string;
        linkedIn: string;
    };
    curriculumVitae: {
        file: {
            name: string;
            data: string;
            contentType: string;
        };
    };
    status: {
        archived: boolean;
        employed: boolean;
        rejected: boolean;
        fired?: boolean;
    };
}
