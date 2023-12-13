import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private url = 'http://51.83.130.126:3000';
  

  constructor(
    private httpClient: HttpClient,

  ) {
    console.log("housing.service constructor");
   }

  // --- Users ---

  getUsers() : User[]{
    console.log("housing.service get Users2");
    let UserList:User[] = [];
    this.httpClient.get<any[]>(this.url+'/Users').subscribe((data: any[]) => {
        data.forEach(elem=> {
            let user:User = JSON.parse(elem['body']) as User
            user  = Object.setPrototypeOf(user, User.prototype);
            let id_on_server:number = parseInt(elem['id']);
            // changing id value for user to be the same on the Server and in models
            if(id_on_server != user.Id){ 
              console.log("Powinno zmienić id z "+ user['id']+" na "+id_on_server);
              user.Id = id_on_server;
              this.putUser(user);
            }
            UserList.push(user);
        });
        console.log(`housing.service get Users succesfull`);
        console.log(UserList);
      }
    )
    return UserList;
  }

  postUser(u:User):void{
    console.log('houseing.service posting new User', u);
    let user_string = JSON.stringify(u);
    this.httpClient.post<any>(this.url+'/Users', {
      body: user_string
    }).subscribe(data => {
      console.log(`housing.service post User ${u} succesfull`);
    });
  }
  putUser(u:User):void{
    console.log('houseing.service posting new User', u);
    let user_id = u.Id;
    let user_string = JSON.stringify(u);
    this.httpClient.put<any>(this.url+'/Users/'+user_id, {
      body: user_string
    }).subscribe(data => {
      console.log(`housing.service put User ${u} succesfull`);
    });
  }
  deleteUser(id:number):void{
    console.log('housing.service delete User: '+id);
    this.httpClient.delete<any>(`${this.url}/Users/${id}`).subscribe(()=>{
      console.log("housing.service succesfull delete of User: "+id);
    });
  }

  
  putUserID(u:User, id:number):void{
    console.log('houseing.service putUserID fun ');

  }

  // --- Posts ---
  // --- Comments ---
  // --- Invits ---
}
