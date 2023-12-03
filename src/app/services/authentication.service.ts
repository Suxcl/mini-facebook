import { Injectable, numberAttribute } from '@angular/core';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    user:User = {} as User;

    constructor(){
        console.log("auth.service constructor");
        try{
            let userTMP:any = JSON.parse( localStorage.getItem('currentUser')|| "{}");
            if(userTMP === "{}"){ userTMP = {} as User; }
            console.log("auth.service user reader from localstorage: userTMP");
            console.log(userTMP);
            console.log(typeof(userTMP));
            
            
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

    login(u:User){
        this.user = u;
        localStorage.setItem('currentUser', JSON.stringify(u));
    }
    logout(){
        this.user = {} as User; 
        localStorage.setItem('currentUser', JSON.stringify({} as User));
    }
    getLoggedUser():User{
        return this.user;
    }
    isSomeoneLoggedIn():boolean{
        if(Object.keys(this.user).length === 0){
            return false;
        }else{return true;}
    }
}
