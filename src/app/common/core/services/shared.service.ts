import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ISnackBar } from '../../shared/interface/snackbar';


@Injectable()
export class SharedService {

  constructor(private snackbar: MatSnackBar) { }

  formatBytes(bytes: number) {
    if(bytes < 1024) return bytes + " Bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
    else return(bytes / 1073741824).toFixed(3) + " GB";
  }

  openSnackbar(snack: ISnackBar) {
    const config = new MatSnackBarConfig();
    config.duration = snack.duration;
    config.horizontalPosition = snack.horizontalPosition;
    config.verticalPosition = snack.verticalPosition;

    this.snackbar.open(snack.message, 'X', config)
  }

}
