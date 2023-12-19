import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers:[NavbarComponent]
})
export class LoginUserComponent implements OnInit{
  form4login:FormGroup;


  constructor(
    private router: Router,
    private userService: UserService,
    private auth:AuthenticationService,
    private formBuilder:FormBuilder,
    private snackbar:SnackbarService
    ){
      console.log("login constructor running")
      this.form4login = formBuilder.group({
        username:
        [
          null,
          {
            validators:[Validators.required]
          }
        ],
        password:
        [
          null,
          {
            validators:[Validators.required]
          }
        ]
      });
  }

  ngOnInit(): void{
    console.log('Login.ts login user initialised');

  }

  doLoginUser(){
    console.log('login:', this.form4login);
    const temp = this.userService.getUserByUsername(this.form4login.value.username);
    console.log(temp);
    if(!temp){ // gdy user nie został odnaleziony
      window.alert("Nie ma takiego użytkownika");
      console.log('Login.ts There is no user with this username');
    }else{ // gdy user został odnaleziony
      if (this.form4login.value.username == temp.Username && this.form4login.value.password == temp.Password) {
        console.log('Login.ts login Succeded');

        this.snackbar.openSnackBar("Login.ts Udane Logowanie, nastepuje przekierowanie na stronę główną");
        this.auth.login(temp); // zalogowanie usera w service authenticator
        this.router.navigate(['/'])
          // przekierowanie gdziekolwiek bo i tak przejdzie na stronę główną
      }else{ // gdy podane są złe dane
        this.snackbar.openSnackBar("Błędne dane");
        console.log('Login.ts Login fails');
      }
    }

  }


}
