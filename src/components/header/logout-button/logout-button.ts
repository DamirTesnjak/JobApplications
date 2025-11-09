import { Component, inject, Input } from '@angular/core';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { updateHrUser } from '../../../app/state/hrUser/hrUser.actions';
import { initialStateHrUser } from '../../../app/state/hrUser/hrUser.reducer';
import { SnackBarService } from '../../snackBar.service';
import { snackbarProps } from '../../globalConstant';
import { Button } from "../../button/button.component";
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-logout-button',
    imports: [Button],
    templateUrl: './logout-button.html',
})
export class LogoutButton {
    private store = inject(Store);
    private http = inject(HttpClient);
    private snackBarService = inject(SnackBarService);
    private localeService = inject(DetectLocaleChangeService);


    @Input() text: string = "";
    snackbarProps = snackbarProps;

    translation = useTranslation("logoutButton", this.localeService.getLocale());

    handleLogout(): void {
        this.http.post(`api/logoutHrUser`, { locale: this.localeService.getLocale() }).subscribe({
            next: () => {
                this.store.dispatch(updateHrUser({ hrUser: initialStateHrUser }))
            },
            error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: err.errorMessage, type: 'error' }),
        });
        // this.onClick.emit();
    }

}
