import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { useTranslation } from '../../utils/translation/useTranslation';
import { ITableData } from './type';
import { ErrorMessage } from '../error-message/error-message';
import { InfoMessage } from '../info-message/info-message';
import { stateSelector } from '../../utils/stateSelector/stateSelector';
import { Store } from '@ngrx/store';
import { ITutorialData } from '../../app/state/tutorialData/tutorialData.state';

@Component({
    selector: 'app-message-display',
    imports: [MatIconModule, InfoMessage, ErrorMessage],
    templateUrl: './message-display.html',
})
export class MessageDisplay {
    private readonly store = inject(Store);

    @Input() page: string = ""
    @Input() pageData!: string;
    @Input() parsedResults!: {
        [x: string]: ITableData[];
    };
    @Input() results!: string;

    translation = useTranslation("en", this.page);
    signal = stateSelector("tutorialData", this.store);
    state = this.signal() as ITutorialData;
    tutorialRunning = this.state.tutorialRunning;

    hasNoData(): boolean {
        return (
            this.parsedResults &&
            (!this.parsedResults[this.pageData] ||
                this.parsedResults[this.pageData].length === 0)
        );
    }

    getInfoMessage(): string {
        return this.translation(
            this.page === 'candidates'
                ? 'noCandidatesFound'
                : 'noEmailTemplatesFound'
        );
    }

    getErrorMessage(): string {
        return this.translation(
            this.page === 'candidates'
                ? 'cannotFindAnyCandidates'
                : 'cannotFindAnyEmailTemplates'
        );
    }
}
