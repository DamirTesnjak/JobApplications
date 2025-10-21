import { Store } from '@ngrx/store';
import { selectCandidate } from '../../app/state/candidate/candidate.selectors';

const selectors = {
    selectCandidate: selectCandidate,
}

export function stateSelector(slice: string, store: Store<any>) {
    const selectedState = store.selectSignal(selectors[slice])
    return selectedState;
}