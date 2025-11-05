import { Component, EnvironmentInjector, inject, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
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

    injector = inject(EnvironmentInjector);
    translation = useTranslation("sidebar", this.injector);
}
