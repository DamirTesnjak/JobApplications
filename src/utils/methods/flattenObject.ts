import { initialStateCandidate, initialStateCompanyEmailConfigs, initialStateHrUser, initialStateTutorialData } from '../../app/state/reducers';

export type IInitialStateCandidate = typeof initialStateCandidate;
export type IInitialStateHrUser = typeof initialStateHrUser;
export type IInitialStateCompanyEmailConfigs = typeof initialStateCompanyEmailConfigs;
export type IInitialStateTutorialData = typeof initialStateTutorialData;

export type IAppState =
    | IInitialStateCandidate
    | IInitialStateHrUser
    | IInitialStateCompanyEmailConfigs
    | IInitialStateTutorialData;
export interface IObjectToFlatExtended {
    [x: string]: any;
}

export type IObjectToFlat = IAppState & IObjectToFlatExtended;

export type IFlattenedObject = {
    [x: string]: any;
};

export default function flattenObject(objectToFlat: IObjectToFlat) {
    const finalObject: IFlattenedObject = {};

    const flatObjectFn = (obj: IObjectToFlat) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                flatObjectFn(obj[key]);
            } else {
                finalObject[key] = obj[key];
            }
        }
    };

    flatObjectFn(objectToFlat);

    return finalObject;
}
