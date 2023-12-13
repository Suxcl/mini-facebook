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


  getUsers() : User[]{
    console.log("housing.service get Users2");
    let UserList:User[] = [];
    this.httpClient.get<any[]>(this.url+'/Users').subscribe((data: any[]) => {
        data.forEach(elem=>{
          UserList.push(new User(
            elem['username'],
            elem['name'],
            elem['surname'],
            elem['password'],
            elem['email'],
            elem['phoneNumber']
             ));
          
        })
      }
    )
    return UserList;
  }
  postUser(u:User):void{
    console.log('houseing.service posting new User', u);
    this.httpClient.post<any>(this.url+'/Users', {
      username: u.Username,
      name: u.Name,
      surname: u.Surname,
      password: u.Password,
      email: u.Email,
      phoneNumber: u.PhoneNumber
    }).subscribe(data => {
      
    });
  }

  
}
