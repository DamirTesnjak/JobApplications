import { Store } from '@ngrx/store';
import { selectCandidate } from '../../app/state/candidate/candidate.selectors';
import { selectHrUser } from '../../app/state/hrUser/hrUser.selectors';
import { selectTutorialData } from '../../app/state/tutorialData/tutorialData.selectors';

type ISelectors = {
    [x: string]: any
}

const selectors: ISelectors = {
    candidate: selectCandidate,
    hrUser: selectHrUser,
    tutorialData: selectTutorialData,
}

export function stateSelector(slice: string, store: Store<any>) {
    const selectedState = store.selectSignal(selectors[slice]);
    return selectedState;
}