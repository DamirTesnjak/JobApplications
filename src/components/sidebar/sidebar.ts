import { Component, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { ISidebarProps } from './type';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink],
    templateUrl: './sidebar.html',
})
export class Sidebar {
    @Input() sidebarLinks!: ISidebarProps[];

    translation = useTranslation("sidebar");
}
