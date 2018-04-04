import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

export class Snackbar {
  constructor(
    public message: string,
    public duration: number,
    public horizontalPosition?: MatSnackBarHorizontalPosition,
    public verticalPosition?: MatSnackBarVerticalPosition,
  ) {}
}
