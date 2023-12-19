import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  public openSnackBar(message:string){
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000,
      verticalPosition: 'top', // Position the toast at the top
      horizontalPosition: 'right' // Position the toast at the right
    });
  }

constructor(
  private snackBar:MatSnackBar
) {

}

}
