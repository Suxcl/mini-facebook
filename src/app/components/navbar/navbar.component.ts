import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { LoginUserComponent } from '../user-folder/login-user/login-user.component';
import { RegisterUserComponent } from '../user-folder/register-user/register-user.component';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,RegisterUserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  @Input() users!:User[];
  isLogged:boolean = false;
  loggedUser!:User;


  constructor
  (
    private authenticationService:AuthenticationService,
    private snackBar:MatSnackBar,
  )
  {
    // Refreshing Navbar if someone logged in
      this.authenticationService.refreshNavbarLogin$.subscribe(()=>{
        console.log("navbar.ts triggering refreshing");
        this.isLogged = true; 
        this.loggedUser = authenticationService.getLoggedUser();
      })
      this.authenticationService.refreshNavbarLogout$.subscribe(()=>{
        console.log("navbar.ts triggering refreshing");
        this.isLogged = false;
        this.loggedUser = {} as User; 
      })
    }

  ngOnInit(): void {
      this.isLogged = this.authenticationService.isSomeoneLoggedIn();
      console.log("navbar.ts test logged user "+this.authenticationService.getLoggedUser().Surname);
  }
 

  logout(){
    this.authenticationService.logout();
    console.log("wylogowano użytkownika");
    this.openToast('Wylogowano użytkownika');
    
  }

  openToast(message:string){
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000
    });
  }
}

