import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { useTranslation } from '../../utils/translation/useTranslation';
import { ErrorMessage } from '../error-message/error-message';
import { InfoMessage } from '../info-message/info-message';
import { stateSelector } from '../../utils/stateSelector/stateSelector';
import { Store } from '@ngrx/store';
import { ITutorialData } from '../../app/state/tutorialData/tutorialData.state';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-message-display',
    imports: [MatIconModule, InfoMessage, ErrorMessage],
    templateUrl: './message-display.html',
})
export class MessageDisplay {
    private store = inject(Store);
    private localeService = inject(DetectLocaleChangeService);

    @Input() page!: string
    @Input() results!: any;

    translation!: (key: string) => string;

    readonly signal = stateSelector("tutorialData", this.store);
    stateTutorialRunning = this.signal() as ITutorialData;
    tutorialRunning = this.stateTutorialRunning.tutorialRunning;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['page']?.currentValue) {
            this.translation = useTranslation(this.page, this.localeService.getLocale());
        }
    }

    hasNoData(): boolean {
        return (
            this.results &&
            (!this.results ||
                this.results.length === 0)
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
