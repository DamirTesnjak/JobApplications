import { Component, EnvironmentInjector, inject } from '@angular/core';
import { EditForm } from '../../../../components/edit-form/edit-form';
import { STORE_REDUCER_NAME } from '../../../../constants/constants';
import { IInitialStateCompanyEmailConfigs } from '../../../state/companyEmailConfigs/copmanyEmailConfigs.state';
import { initialStateCompanyEmailConfigs } from '../../../state/companyEmailConfigs/companyEmailConfigs.reducers';
import { useTranslation } from '../../../../utils/translation/useTranslation';
import { DetectLocaleChangeService } from '../../../../utils/translation/detectLocaleChange.service';


@Component({
    selector: 'app-company-email-configuration-page',
    imports: [EditForm],
    templateUrl: './companyEmailConfigurationPage.html',
    styleUrl: '../../../../styles/global/globals.module.scss'
})
export class CompanyEmailConfigurationPage {
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("editForm", this.localeService.languageString);

    initialStateCompanyEmailConfigs: IInitialStateCompanyEmailConfigs = initialStateCompanyEmailConfigs;
    STORE_REDUCER_NAME = STORE_REDUCER_NAME;
}
