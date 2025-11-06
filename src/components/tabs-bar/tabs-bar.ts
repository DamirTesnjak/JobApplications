import { Component, EnvironmentInjector, inject, Input } from '@angular/core';
import { useTranslation } from '../../utils/translation/useTranslation';
import { ITabList } from './type';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tabs-bar',
    imports: [MatTabsModule, RouterLink],
    templateUrl: './tabs-bar.html',
})
export class TabsBar {
    @Input() tabsList!: ITabList[];
    @Input() activeLink!: string;

    injector = inject(EnvironmentInjector);
    translation = useTranslation("sidebar", this.injector);
}
