import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '../dialog-component/dialog-component';
import { Button } from '../button/button.component';
import { DialogService } from '../dialog.service';
import { SnackBarService } from '../snackBar.service';
import { snackbarProps } from '../globalConstant';
import { IButtonProps } from '../button/type';
import { DATABASES } from '../../constants/constants';
import { initialStateCandidate } from '../../app/state/candidate/candidate.reducer';
import { initialStateHrUser } from '../../app/state/hrUser/hrUser.reducer';
import { updateCandidate } from '../../app/state/candidate/candidate.actions';
import { updateHrUser } from '../../app/state/hrUser/hrUser.actions';

interface IResponse {
    successMessage: string;
    errorMessage?: string;
    success?: boolean;
    error?: boolean;
}

@Component({
    selector: 'app-delete-profile-button',
    imports: [Button],
    templateUrl: './delete-profile-button.html',
    styleUrl: './delete-profile-button.scss'
})
export class DeleteProfileButton {
    private dialogService = inject(DialogService);
    private snackBarService = inject(SnackBarService);
    private store = inject(Store);
    private http = inject(HttpClient);

    snackbarProps = snackbarProps;

    @Input() databaseName: string = "";

    // Button props
    id: IButtonProps["id"] = "deleteProfileButton";
    text: IButtonProps["text"] = "Delete profile";
    className: IButtonProps["className"] = 'textButton';
    type: IButtonProps["type"] = 'submit';
    database: string = DATABASES[this.databaseName]

    @Output() onClick = new EventEmitter<void>();

    handleDeleteEmailTemplate(event: Event): void {
        const dialogProps = {
            data: {
                dialogTitle: "Warning!",
                dialogText: "Are you sure you want to delete a profile? The action is inreversible!",
                handleClickAction: () => this.deleteProfile(event),
            }
        }
        this.dialogService.openDialog(DialogComponent, dialogProps);
    };

    deleteProfile(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
        }

        this.http.post('api/profile/delete', bodyReq, { observe: 'response' }).subscribe({
            next: (res) => {
                if (res.status === 200) {
                    console.log('resprofileDelete', res);
                    const response = res.body as IResponse;
                    this.snackBarService.openSnackBar({
                        ...this.snackbarProps,
                        message: response.successMessage,
                        type: 'success',
                    });
                    if (DATABASES.candidates === this.database) {
                        this.store.dispatch(updateCandidate({ candidate: initialStateCandidate }))
                    }
                    if (DATABASES.hrUsers === this.database) {
                        this.store.dispatch(updateHrUser({ hrUser: initialStateHrUser }))
                    }
                }
            },
            error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: err.errorMessage, type: 'error' }),
        });
        // this.onClick.emit();
    }
}
