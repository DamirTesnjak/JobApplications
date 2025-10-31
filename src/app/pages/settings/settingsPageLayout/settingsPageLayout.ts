import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { RouterOutlet } from '@angular/router';
import { TabsBar } from '../../../../components/tabs-bar/tabs-bar';

@Component({
    selector: 'app-settings-page-layout',
    imports: [RouterOutlet, MatTabsModule, TabsBar],
    templateUrl: './settingsPageLayout.html',
})
export class SettingsPageLayout {
    translation = useTranslation("settings");

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
