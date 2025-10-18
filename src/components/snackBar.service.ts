import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

type IsnackbarProps = {
    duration: number;
    message: string;
    horizontalPosition: MatSnackBarHorizontalPosition;
    verticalPosition: MatSnackBarVerticalPosition;
    type: 'success' | 'error' | 'warning';
}

@Injectable({
    providedIn: 'root'
})

export class SnackBarService {
    private _snackBar = inject(MatSnackBar);

    openSnackBar(snackbarProps: IsnackbarProps) {
        const { duration, message, horizontalPosition, verticalPosition, type } = snackbarProps
        this._snackBar.open(message, 'OK', {
            duration: duration,
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            panelClass: [`${type}-snackbar`]
        });
    }
}