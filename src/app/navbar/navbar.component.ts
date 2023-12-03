import { ApplicationRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { LoginUserComponent } from '../user-folder/login-user/login-user.component';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';


import { User } from '../models/user.model';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoginUserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[UserService],
})
export class NavbarComponent implements OnInit{

  isLogged!:boolean;

  constructor(
    private router: Router,
    private userService:UserService,
    private authenticationService:AuthenticationService){

      // Refreshing Navbar if someone logged in
      this.authenticationService.refreshNavbar$.subscribe(()=>{
        console.log("navbar.ts triggering refreshing");
        this.isLogged = this.authenticationService.isSomeoneLoggedIn();
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
