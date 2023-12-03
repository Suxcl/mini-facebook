import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


export function uniqueUsernameValidator(userService:UserService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const userList:User[] = userService.getUsers();
    let isValid = false;
    for(let user of userList){
      if(user.Username === control.value){
        isValid = true;
      }
    }
    // Return an object if validation fails
    return isValid ? null : { customError: true };
  };
}
