import { Component, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { MatIconModule } from '@angular/material/icon';
import { ProfileActions } from './profile-actions/profile-actions';

@Component({
    selector: 'app-header',
    imports: [MatIconModule, ProfileActions],
    templateUrl: './header.html',
    styleUrl: './header.scss'
})
export class Header {
    @Input() text: string = "";

    translation = useTranslation("en", "header");

}
