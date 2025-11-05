import { Component, EnvironmentInjector, inject } from '@angular/core';
import { EditForm } from '../../../../components/edit-form/edit-form';
import { STORE_REDUCER_NAME } from '../../../../constants/constants';
import { IInitialStateCompanyEmailConfigs } from '../../../state/companyEmailConfigs/copmanyEmailConfigs.state';
import { initialStateCompanyEmailConfigs } from '../../../state/companyEmailConfigs/companyEmailConfigs.reducers';
import { useTranslation } from '../../../../utils/translation/useTranslation';


@Component({
    selector: 'app-company-email-configuration-page',
    imports: [EditForm],
    templateUrl: './companyEmailConfigurationPage.html',
})
export class CompanyEmailConfigurationPage {
    injector = inject(EnvironmentInjector);
    translation = useTranslation("editForm", this.injector);

    initialStateCompanyEmailConfigs: IInitialStateCompanyEmailConfigs = initialStateCompanyEmailConfigs;
    STORE_REDUCER_NAME = STORE_REDUCER_NAME;
}
