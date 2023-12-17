import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Invitation } from '../models/invitation.model';


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
    // console.log("housing.service get Users2");
    let UserList:User[] = [];
    this.httpClient.get<any[]>(this.url+'/Users').subscribe((data: any[]) => {
        data.forEach(elem=> {
            let user:User = JSON.parse(elem['body']) as User
            user  = Object.setPrototypeOf(user, User.prototype);
            let id_on_server:number = parseInt(elem['id']);
            // changing id value for user to be the same on the Server and in models
            // this is required becouse of DELETE and PUT which needs specific index on server
            if(id_on_server != user.Id){ 
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
  //  === ===== ===== Dodać aktualziacje danych przez event>? chyba sam nie wiem raczej nie bo działa
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

  // --- Posts ---
  // --- Comments ---
  // --- Invits ---


getInvites(): Invitation[]{
  
  console.log("housing.service get Invitations");
  let invList:Invitation[] = [];
  this.httpClient.get<any[]>(this.url+'/Invites').subscribe((data: any[]) => {
      data.forEach(elem=> {
          let inv:Invitation = JSON.parse(elem['body']) as Invitation
          inv  = Object.setPrototypeOf(inv, User.prototype);
          let id_on_server:number = parseInt(elem['id']);
          // changing id value for user to be the same on the Server and in models
          // this is required becouse of DELETE and PUT which needs specific index on server
          if(id_on_server != inv.Id){ 
            inv.Id = id_on_server;
            this.putInvite(inv);
          }
          invList.push(inv);
      });
      console.log(`housing.service get Users successful`);
      console.log(invList);
    }
  )
  return invList;
}
postInvite(i:Invitation):void{
  console.log('houseing.service posting new Invite', i);
  let data_string = JSON.stringify(i);
  this.httpClient.post<any>(this.url+'/Invites', {
    body: data_string
  }).subscribe(data => {
    console.log(`housing.service post User ${i} successful`);
  });
}
putInvite(i:Invitation):void{
  console.log('houseing.service put INVITE', i);
  let elem_id = i.Id;
  let data_string = JSON.stringify(i);
  this.httpClient.put<any>(this.url+'/Invites'+elem_id, {
    body: data_string
  }).subscribe(data => {
    console.log(`housing.service put User ${i}} successful`);
  });
}

}
