import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

export interface ISnackBar {
  message: string;
  duration: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}
