import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../models/user.model';

// services
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';

// validators
import { uniqueUsernameValidator } from '../../../validators/uniqueUsernameValidator';
import { state } from '@angular/animations';
import { Observable } from 'rxjs/internal/Observable';
import { delay, map, of } from 'rxjs';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {

  f:FormGroup;

  constructor(
    private userS:UserService,
    private auth:AuthenticationService,
    private router:Router,
    private fb:FormBuilder) {
      console.log("register.ts constructor");
      this.f = fb.group({
        username:
          [ null,
            {
            validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
            asyncValidators: [this.usernameValidator()]
            }
          ],
        password: [
          null,
          {
            validators: [Validators.required]
          }
          //   Validators.minLength(8),
          //   // custom validator for password strenght
        ],
        name: [
          null,
          {
            validators:[Validators.required,Validators.maxLength(50)]
          }
        ],
        surname: [
          null,
          {
            validators:[Validators.required,Validators.maxLength(50)]
          }
        ],
        email: [
          null,
          {
            validators:[Validators.required,Validators.email]
          }
        ],
        phoneNumber: [
          null,
          {
            validators:[Validators.required]
          }
          //custom validator for checking number size
        ]
      });
  }

  AddUser(){
    console.log("register.ts" + this.f);
    let newUser = new User(
      this.userS.getUniqueId(),
      this.f.value.username,
      this.f.value.name,
      this.f.value.surname,
      this.f.value.password,
      this.f.value.email,
      this.f.value.phoneNumber,
    );
    console.log("register.ts adding new user: "+newUser.Username);
    this.userS.addUser(newUser);
    this.auth.login(newUser);
    this.router.navigate(
      ['/']
    );

  };

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }

  checkIfUsernameExists(username:string):Observable<boolean>{
    return of(this.userS.isUsernameTaken(username)).pipe(delay(1000));
  }




  ngOnInit(): void {
    console.log('register.ts onInit');
    // clearowanie elemntów formularza z powopdu wyświetlania
    // wszystkich validatorów jako wartości poszczególnych pól
    // this.f.setValue({
    //   username: "", name: "", surname: "", email: "", phoneNumber: ""
    // });
  }
}
