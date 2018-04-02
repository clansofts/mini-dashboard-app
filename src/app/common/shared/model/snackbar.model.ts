import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

export class Snackbar {
  constructor(
    public message: string,
    public horizontalPosition: MatSnackBarHorizontalPosition,
    public verticalPosition: MatSnackBarVerticalPosition,
    public duration: number,
  ) {}
}
