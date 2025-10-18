import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export const snackbarProps = {
    duration: 5000,
    horizontalPosition: 'start' as MatSnackBarHorizontalPosition,
    verticalPosition: 'bottom' as MatSnackBarVerticalPosition,
    type: 'success' as 'success' | 'error' | 'warning',
}