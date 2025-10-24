import { Component, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { RouterLink } from '@angular/router';
import { ITabList } from './type';

@Component({
    selector: 'app-tabs-bar',
    imports: [RouterLink],
    templateUrl: './tabs-bar.html',
})
export class TabsBar {
    @Input() tabList!: ITabList[];

    translation = useTranslation("en", "sidebar");
}
