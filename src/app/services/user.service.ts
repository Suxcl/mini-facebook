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
  public usersSubject = new BehaviorSubject<any[]>([]);
  private url = 'http://51.83.130.126:3000';

  constructor(
    private housingService: HousingService,
    
  ) {
    console.log("user.service constructor reading users from db");
    let data:User[] = this.housingService.getUsers();    
    this.updateUsers(data);
  }

  getUsers():User[]{
    return this.Users;
  }
  updateUsers(users:User[]){
    this.Users = users;
    this.usersSubject.next(users);
  }
  getUsersAsObservable():Observable<any>{
    return this.usersSubject.asObservable();
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
      if (user.Username==username) {
        return user;
      }
    } 
    return {} as User;
  }

  addUser(user: User):void{
    this.Users.push(user); // adding user to list in service
    this.housingService.postUser(user); // add user to JSON server
    console.log("user.service " + this.Users );
    this.refreshUsers$.emit(); // emit event to refresh displays of users
  }

  updateUser(user:User, id:number):void{
    this.Users[id] = user;
    this.refreshUsers$.emit();
  }
  removeUser(id:number):void{
    delete this.Users[id];
    this.refreshUsers$.emit();
  }

  removeFriend(u:User, u2:User):void{
    for(let el of this.Users){
      if(el.Surname==u.Surname){
        el.FriendsList.splice(el.FriendsList.indexOf(u2), 1);
      }
    }
    this.housingService.putUser(u)
    this.refreshUsers$.emit();
  }

  getUniqueId():number{
    return this.Users.length+1;
  } 

}
