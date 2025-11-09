import { Component, EnvironmentInjector, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { RouterOutlet } from '@angular/router';
import { TabsBar } from '../../../../components/tabs-bar/tabs-bar';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-settings-page-layout',
    imports: [RouterOutlet, MatTabsModule, TabsBar],
    templateUrl: './settingsPageLayout.html',
    styleUrl: './settingsPageLayout.scss'
})
export class SettingsPageLayout {
    injector = inject(EnvironmentInjector);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("settings", this.localeService.languageString);

    tabsList = [
        {
            id: "companyEmailConfiguration",
            url: `/settings/companyEmailConfiguration`,
            text: this.translation("companyEmailConfiguration"),
        },
        {
            id: "setupEmailTemplateMessages",
            url: `/settings/setupEmailTemplateMessages`,
            text: this.translation("setupEmailTemplateMessages"),
        },
        {
            id: "overviewEmailTemplateMessages",
            url: `/settings/overviewEmailTemplateMessages`,
            text: this.translation("overviewEmailTemplateMessages"),
        },
        {
            id: "mapEmailTemplateMessages",
            url: `/settings/mapTemplateMessages`,
            text: this.translation("mapEmailTemplateMessages"),
        },
    ];

    activeLink = this.tabsList[0].url;
}
