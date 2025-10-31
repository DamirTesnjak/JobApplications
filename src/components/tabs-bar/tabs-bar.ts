import { Component, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { RouterLink } from '@angular/router';
import { ITabList } from './type';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-tabs-bar',
    imports: [MatTabsModule],
    templateUrl: './tabs-bar.html',
})
export class TabsBar {
    @Input() tabsList!: ITabList[];
    @Input() activeLink!: string;

    translation = useTranslation("sidebar");
}
