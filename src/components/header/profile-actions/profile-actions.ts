import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { stateSelector } from '../../../utils/stateSelector/stateSelector';
import { Store } from '@ngrx/store';
import { Button } from "../../button/button.component";
import { RouterLink } from '@angular/router';
import { IInitialStateHrUser } from '../../../app/state/hrUser/hrUser.state';
import { getFile } from '../../../utils/getFile/getFile';
import { TutorialFeature } from "../../tutorial-feature/tutorial-feature";
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-profile-actions',
    imports: [MatIconModule, Button, RouterLink, TutorialFeature],
    templateUrl: './profile-actions.html',
    styleUrl: '../header.scss'
})
export class ProfileActions {
    private store = inject(Store);
    private localeService = inject(DetectLocaleChangeService);

    @Input() text: string = "";

    translation = useTranslation("header", this.localeService.languageString);

    signal = stateSelector("hrUser", this.store);
    state = this.signal() as IInitialStateHrUser;
    profilePicture = this.state.profilePicture;
    username = this.state.username;

    getFileMethod(file: IInitialStateHrUser["profilePicture"]["file"]) {
        return getFile(file);
    };
}
