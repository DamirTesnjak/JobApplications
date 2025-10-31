import { Component, EventEmitter, inject, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '../dialog-component/dialog-component';
import { Button } from '../button/button.component';
import { DialogService } from '../dialog.service';
import { SnackBarService } from '../snackBar.service';
import { snackbarProps } from '../globalConstant';
import { IButtonProps } from '../button/type';

@Component({
  selector: 'app-delete-email-template-button',
  imports: [Button],
  templateUrl: './delete-email-template-button.component.html',
  styleUrl: './delete-email-template-button.component.scss'
})
export class DeleteEmailTemplateButton {
  private dialogService = inject(DialogService);
  private snackBarService = inject(SnackBarService);
  private http = inject(HttpClient);

  snackbarProps = snackbarProps;

  // Button props
  id: IButtonProps["id"] = "deleteEmailTemplateButton";
  text: IButtonProps["text"] = "Delete template";
  className: IButtonProps["className"] = 'textButton';
  type: IButtonProps["type"] = 'submit';

  @Output() onClick = new EventEmitter<void>();

  handleDeleteEmailTemplate(event: Event): void {
    const dialogProps = {
      data: {
        dialogTitle: "Warning!",
        dialogText: "Are you sure you want to selected email template? The action is inreversible!",
        handleClickAction: () => this.deleteEmailTemplate(event),
      }
    }
    this.dialogService.openDialog(DialogComponent, dialogProps);
  };

  deleteEmailTemplate(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const bodyReq = {
      formData: formData,
    }

    this.http.post('api/email_template/delete', bodyReq).subscribe({
      next: (res) => {
        console.log('resEmailTemplateDelete', res);
        this.snackBarService.openSnackBar({
          ...this.snackbarProps,
          message: res.successMessage,
          type: 'success',
        });
      },
      error: (err) => this.snackBarService.openSnackBar({ ...this.snackbarProps, message: err.errorMessage, type: 'error' }),
    });
    this.onClick.emit();
  }
}
