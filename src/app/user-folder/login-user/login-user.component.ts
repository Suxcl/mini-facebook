import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NavbarComponent } from '../../navbar/navbar.component';
// import { emit } from 'process';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers:[UserService, NavbarComponent]
})
export class LoginUserComponent implements OnInit{
  form4login:FormGroup;


  constructor(
    private router: Router,
    private userService: UserService,
    private auth:AuthenticationService,
    private navbar:NavbarComponent){
      console.log("login constructor running")
      this.form4login = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
      });
  }

  ngOnInit(): void{
    console.log('Login.ts login user initialised');
  }

  doLoginUser(){
    console.log('login:', this.form4login);
    const temp = this.userService.getUserByUsername(this.form4login.value.username);
    console.log(temp);
    if(!temp){
      console.log('Login.ts There is no user with this username');
    }else{
      if (this.form4login.value.username == temp.Username && this.form4login.value.password == temp.Password) {
        console.log('Login.ts login Succeded');

        window.alert("Login.ts Udane Logowanie, nastepuje przekierowanie na stronę główną");
        this.auth.login(temp);

        console.log("Login.ts Testing login user from auth.service: " + this.auth.getLoggedUser().Surname);
  
        this.router.navigate(['/']);      
      }else{
        console.log('Login.ts Login fails');
      }  
    }
    
  }

}
