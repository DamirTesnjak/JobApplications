import { Component, inject, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { ISidebarProps } from './type';
import { RouterLink } from '@angular/router';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss'
})
export class Sidebar {
    private localeService = inject(DetectLocaleChangeService);

    @Input() sidebarLinks!: ISidebarProps[];

    translation = useTranslation("sidebar", this.localeService.getLocale());
}
