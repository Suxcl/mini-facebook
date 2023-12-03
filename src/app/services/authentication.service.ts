import { EventEmitter, Injectable, numberAttribute } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    // defining unlogged user as empty object of User
    user:User = {} as User;
    // event for refreshing navbar if someone logged in or unlogged
    public refreshNavbar$: EventEmitter<void> = new EventEmitter<void>();

    constructor(){
        console.log("auth.service constructor");
        try{
            // reading value from localStorage to identify if someone is logged in 
            let userTMP:any = JSON.parse( localStorage.getItem('currentUser')|| "{}");
            if(userTMP === "{}"){ userTMP = {} as User; }

            console.log("auth.service user reader from localstorage: userTMP");
            console.log(userTMP);
            console.log(typeof(userTMP));
            
            // if 
            if(Object.keys(this.user).length != 0){
                console.log("auth.service User reader is valid User")
                this.user = userTMP;
            }else{
                console.log("auth.service User reader is not valid User")
            }
        }catch (err){
            console.log("auth.service error on JSON parse    error value: "+err);
        }
        
    }

    login(u:User):void{
        this.user = u;
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.refreshNavbar$.emit();
    }
    logout():void{
        this.user = {} as User; 
        localStorage.setItem('currentUser', JSON.stringify({} as User));
        this.refreshNavbar$.emit();
    }
    getLoggedUser():User{
        return this.user;
    }
    isSomeoneLoggedIn():boolean{
        if(Object.keys(this.user).length === 0){
            return false;
        }else{return true;}
    }
    public triggerRefreshNavbar():void{
        this.refreshNavbar$.emit();
    }
}
