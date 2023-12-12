import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { Router } from '@angular/router';

import { LoginUserComponent } from '../user-folder/login-user/login-user.component';
import { RegisterUserComponent } from '../user-folder/register-user/register-user.component';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';


import { User } from '../models/user.model';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from '../app.routes';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoginUserComponent,RegisterUserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  @Input() users!:User[];
  isLogged:boolean = false;
  loggedUser:User | undefined;
  userName:String | undefined;

  constructor(
    private router: Router,
    
    private userService:UserService,
    private authenticationService:AuthenticationService){

      // Refreshing Navbar if someone logged in
      this.authenticationService.refreshNavbarLogin$.subscribe(()=>{
        console.log("navbar.ts triggering refreshing");
        this.isLogged = true; 
        this.loggedUser = authenticationService.getLoggedUser();
        this.userName = this.loggedUser.Username;
        // this.isLogged = this.authenticationService.isSomeoneLoggedIn();
        //this.
  
        // window.location.reload();
        // router.navigate(['/']);
      })
      this.authenticationService.refreshNavbarLogout$.subscribe(()=>{
        console.log("navbar.ts triggering refreshing");
        this.isLogged = false;
        this.loggedUser = {}as User;
        this.userName = {}as string;
      })
    }

  

  ngOnInit(): void {
      this.isLogged = this.authenticationService.isSomeoneLoggedIn();
      console.log("navbar.ts " + this.isLogged);
      console.log("navbar.ts test logged user "+this.authenticationService.getLoggedUser().Surname);
  }
 

  logout(){
    this.authenticationService.logout();
    console.log("wylogowano użytkownika");
  }
}

