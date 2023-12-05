import { EventEmitter, Injectable, numberAttribute } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    // defining unlogged user as empty object of User
    user:User = {} as User;
    NewUser:boolean = false;
    // event for refreshing navbar if someone logged in or unlogged
    public refreshNavbarLogin$: EventEmitter<void> = new EventEmitter<void>();
    public refreshNavbarLogout$: EventEmitter<void> = new EventEmitter<void>();

    constructor(){
        console.log("auth.service constructor");
        try{
            // reading value from localStorage to identify if someone is logged in 
            let userTMP:any = JSON.parse( localStorage.getItem('currentUser')|| "{}");
            if(userTMP === "{}"){ userTMP = {} as User; }

            // cheecking if reader value have keys
            if(Object.keys(userTMP).length != 0){
                console.log("auth.service User is valid User")
                this.user = userTMP;
            }else{ // if ther is no keys there is no logged user
                console.log("auth.service User is not valid User")
            }
        }catch (err){ // parsing error when there is no value to read from localStorage
            console.log("auth.service error on JSON parse    error value: "+err);
        }
        
    }

    login(u:User):void{ // for logging user into localStorage
        this.user = u;
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.refreshNavbarLogin$.emit();
    }
    register(u:User):void{ // registering user, logging him and setting up for adding him to user list on blog.ts
        this.user = u;
        this.NewUser = true;
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.refreshNavbarLogin$.emit();
    }
    changeNewUserToFalse():void{
        this.NewUser = false;
    }
    logout():void{
        this.user = {} as User; 
        localStorage.setItem('currentUser', JSON.stringify({} as User));
        this.refreshNavbarLogout$.emit();
    }
    getLoggedUser():User{
        console.log('auth.service getLoggedUser() user value: ' + this.user);
        return this.user;
    }
    isSomeoneLoggedIn():boolean{
        if(Object.keys(this.user).length ==0){
            return false;
        }else{return true;}
    }
     
    isNewUser():boolean{
        return this.NewUser;
    }
    // public triggerRefreshNavbar():void{
    //     this.refreshNavbar$.emit();
    // }
}
