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

  constructor
  (
    private httpClient: HttpClient,
  ) 
  {
    console.log("housing.service constructor");
  }
  // http requests that handle all data types
  // on calling requires the name of the data type
  // which: Users, Posts, Comment, Invites
  getData(which:string) : any[]{
    let dataList:any[]=[];
    this.httpClient.get<any[]>(this.url+`/${which}`).subscribe((data: any[])=>{
      data.forEach(elem=>{
        // var declaration
        let id_on_server:number = parseInt(elem['id']);
        let objectData;
        switch(which){
          case 'Users':
            objectData = JSON.parse(elem['body']) as User
            objectData = Object.setPrototypeOf(objectData, User.prototype);
            break
          case 'Posts':
            objectData = JSON.parse(elem['body']) as Post
            objectData = Object.setPrototypeOf(objectData, Post.prototype);
            break
          case 'Comments':
            objectData = JSON.parse(elem['body']) as Comment
            objectData = Object.setPrototypeOf(objectData, Comment.prototype);
            break
          case 'Invites':
            objectData = JSON.parse(elem['body']) as Invitation
            objectData = Object.setPrototypeOf(objectData, Invitation.prototype);
            break
        }
        
        if(id_on_server != objectData.Id){
          objectData.Id = id_on_server;
          this.putData(which,objectData);
        }
        dataList.push(objectData);
      });
      console.log(`housing.service get ${which} successful`);
      console.log(dataList);
    });
    return dataList;
  }

  postData(which:string, data:any):void{
    console.log('housing.service posting new '+which,data);
    this.httpClient.post<any>(this.url+`/${which}`, {
      body: JSON.stringify(data)
    }).subscribe(data=>{
      console.log(`housing.service post ${which} successful`);
    });
  }
  putData(which:string,data:any):void{
    console.log('housing.service posting new '+which,data);
    let data_id = data.Id;
    let data_string = JSON.stringify(data);
    this.httpClient.put<any>(this.url+`/${which}/${data_id}`, {
      body: data_string
    }).subscribe(data=>{
      console.log(`housing.service put ${data} successful`);
    });
  }

  deleteData(which:string, id:number):void{
    console.log('housing.service delete '+which+': '+id);
    this.httpClient.delete<any>(`${this.url}/${which}/${id}`).subscribe(()=>{
      console.log("housing.service successful delete of "+which+': '+id);
    });
  }
}
