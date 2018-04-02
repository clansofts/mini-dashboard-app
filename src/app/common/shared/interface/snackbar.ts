import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

export interface ISnackBar {
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
  duration: number;
}
