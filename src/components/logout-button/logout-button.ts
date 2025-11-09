import { Component, inject } from '@angular/core';
import { Button } from '../button/button.component';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../snackBar.service';
import { snackbarProps } from '../globalConstant';
import { useTranslation } from '../../utils/translation/useTranslation';
import { Store } from '@ngrx/store';
import { initialStateHrUser } from '../../app/state/hrUser/hrUser.reducer';
import { updateHrUser } from '../../app/state/hrUser/hrUser.actions';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-logout-button',
    imports: [Button],
    templateUrl: './logout-button.html',
})
export class RowButton {
    private http = inject(HttpClient);
    private snackBarService = inject(SnackBarService);
    private store = inject(Store);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("logoutButton", this.localeService.languageString);

    snackbarProps = snackbarProps;

    handleLogout(): void {
        this.http.post(`api/logoutHrUser`, { locale: this.localeService.languageString }).subscribe({
            next: (res) => {
                console.log("logoutHrUser", res);
                this.store.dispatch(updateHrUser({ hrUser: initialStateHrUser }))
                this.snackBarService.openSnackBar({
                    ...this.snackbarProps,
                    message: this.translation("logoutComplete"),
                    type: 'success',
                });
            },
            error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: this.translation("logoutError"), type: 'error' }),
        });
        // this.onClick.emit();
    }
}
