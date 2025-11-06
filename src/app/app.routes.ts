import { Routes } from '@angular/router';
import { CandidateProfileLayout } from './pages/candidateProfile/candidateProfileLayout/candidateProfileLayout';
import { CandidateProfilePage } from './pages/candidateProfile/canditadeProfilePage';
import { EditCandidatePage } from './pages/candidateProfile/editCandidate/editCandidatePage';
import { CandidatesLayout } from './pages/candidates/candidatesLayout/candidatesLayout';
import { CandidatesPage } from './pages/candidates/candidatesPage';
import { CreateCandidatePage } from './pages/candidates/createCandidate/createCandidatePage';
import { HrUserProfileLayout } from './pages/hrUserProfile/hrUserProfileLayout/hrUserProfileLayout';
import { HrProfilePage } from './pages/hrUserProfile/hrProfilePage';
import { EditHrUserProfilePage } from './pages/hrUserProfile/editHrUserProfile/editHrUserProfilePage';
import { LoginPageLayout } from './pages/login/loginPageLayout/loginPageLayout';
import { LoginPage } from './pages/login/loginPage';
import { RegisterPage } from './pages/register/registePage';
import { RegisterPageLayout } from './pages/register/registerPageLayout/registerPageLayout';
import { SettingsPageLayout } from './pages/settings/settingsPageLayout/settingsPageLayout';
import { SettingsPage } from './pages/settings/settingsPage';
import { CompanyEmailConfigurationPage } from './pages/settings/companyEmailConfiguration/companyEmailConfigurationPage';
import { EmailTypePage } from './pages/settings/emailType/emailTypePage';
import { MapTemplateMessagesPage } from './pages/settings/mapTemplateMessages/mapTemplateMessagesPage';
import { OverviewEmailTemplateMessagesPage } from './pages/settings/overviewEmailTemplateMessages/overviewEmailTemplateMessagesPage';
import { SetupEmailTemplateMessagesPage } from './pages/settings/setupEmailTemplateMessages/setupEmailTemplateMessagesPage';
import { VerifyEmailPage } from './pages/verifyEmail/verifyEmailPage';

export const routes: Routes = [
    {
        path: '',
        component: CandidatesLayout,
        children: [
            { path: '', component: CandidatesPage },
            { path: 'createCandidate', component: CreateCandidatePage },
        ],
    },
    {
        path: 'candidateProfile/:id',
        component: CandidateProfileLayout,
        children: [
            { path: '', component: CandidateProfilePage },
            { path: 'editCandidate', component: EditCandidatePage },
        ],
    },
    {
        path: 'candidates',
        component: CandidatesLayout,
        children: [
            { path: '', component: CandidatesPage },
            { path: 'createCandidate', component: CreateCandidatePage },
        ],
    },
    {
        path: 'hrUserProfile/:id',
        component: HrUserProfileLayout,
        children: [
            { path: '', component: HrProfilePage },
            { path: 'editHrUserProfile', component: EditHrUserProfilePage },
        ],
    },
    {
        path: 'login',
        component: LoginPageLayout,
        children: [
            { path: '', component: LoginPage },
        ],
    },
    {
        path: 'register',
        component: RegisterPageLayout,
        children: [
            { path: '', component: RegisterPage },
        ],
    },
    {
        path: 'settings',
        component: SettingsPageLayout,
        children: [
            { path: '', component: SettingsPage },
            { path: 'companyEmailConfiguration', component: CompanyEmailConfigurationPage },
            { path: 'emailType', component: EmailTypePage },
            { path: 'mapTemplateMessages', component: MapTemplateMessagesPage },
            { path: 'overviewEmailTemplateMessages', component: OverviewEmailTemplateMessagesPage },
            { path: 'setupEmailTemplateMessages', component: SetupEmailTemplateMessagesPage },
        ],
    },
    {
        path: 'verifyEmail',
        component: VerifyEmailPage,
    }
];
