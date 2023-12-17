import { HousingService } from './housing.service';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // dataPosts = [
  //   ["user1","posttttt"],
  //   ["user2","posttttt"],
  //   ["user3","posttttt"],
  //   ["user4","posttttt"]
  // ]

  Posts:Post[]=[];

  constructor(
    private housingService: HousingService,
    private httpClient: HttpClient,
    ) {
    console.log("post.service constructor");
    this.Posts = this.housingService.getData('Posts');
    // for (let index = 0; index < this.dataPosts.length; index++) {
    //   const element = this.dataPosts[index];
    //   this.Posts.push(new Post(this.getUniqueId(),element[0],element[1]));
    // }
  }

  getPosts():Post[]{
    return this.Posts;
  };

  getPostsOfUser(u:User):Post[]{
    let surname:string = u.Username;
    let tmp:Post[] = [];
    this.Posts.forEach(element => {
      if(surname === element.Username){
        tmp.push(element);
      }
    });
    return tmp;
  }

  getUniqueId():number{
    let unique:number =0;
    this.Posts.forEach(elem =>{
      if (elem.Id >= unique) {
        unique = elem.Id + 1;
      }
    });
    return unique;
  }

}
