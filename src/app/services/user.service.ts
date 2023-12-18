import { EventEmitter, Injectable, numberAttribute } from '@angular/core';
import { HousingService } from './housing.service';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public refreshUsers$: EventEmitter<void> = new EventEmitter<void>();
  public Users:User[] = [];
  private url = 'http://51.83.130.126:3000';

  constructor(
    private housingService: HousingService,
    
  ) {
    console.log("user.service constructor reading users from db");
    this.Users = this.housingService.getData('Users');    
    
  }

  getUsers():User[]{
    return this.Users;
  }
  getUserbyId(id:number):User{
    for(let user of this.Users){
      if (user.Id==id) {
        return user;
      }
    }
    return {} as User;
  }
  getUserByIndexFromList(nr:number):User{
    return this.Users[nr];
  }

  getUserByUsername(username:string):User{
    for(let user of this.Users){
      if (user.Username===username) {
        return user;
      }
    }
    return {} as User;
  }
  getUserIndex(user:User):number{
    return this.Users.indexOf(user);
  }
  isUsernameTaken(username:string){
    if (this.getUserByUsername(username) != null) {
      console.log(username+":"+ (this.getUserByUsername(username) != {} as User));
      return true
    }
    return false
  }

  addUser(user: User):void{
    this.Users.push(user); // adding user to list in service
    this.housingService.postData('Users',user); // add user to JSON server
    console.log("user.service " + this.Users );
    // this.refreshUsers$.emit(); // emit event to refresh displays of users
  }

  updateUser(user:User):void{
    this.Users[this.getUserIndex(user)] = user;
    this.housingService.putData('Users',user);
    this.refreshUsers$.emit();
  }
  removeUser(id:number):void{
    delete this.Users[id];
    this.refreshUsers$.emit();
  }
  // === FRIENDS ===
  removeFriend(u:User, u2:User):void{
    u.removeFriend(u2);
    u2.removeFriend(u);
    this.housingService.putData('Users',u)
    this.housingService.putData('Users',u2)
    this.refreshUsers$.emit();
  }

  getUniqueId():number{
    return this.Users.length+1;
  }

}
