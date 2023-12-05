import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  dataPosts = [
    ["user1","posttttt"],
    ["user2","posttttt"],
    ["user3","posttttt"],
    ["user4","posttttt"]
  ]

  Posts:Post[]=[];

  constructor() {
    for (let index = 0; index < this.dataPosts.length; index++) {
      const element = this.dataPosts[index];
      this.Posts.push(new Post(element[0],element[1]));
    }
  }

  getPosts():Post[]{
    return this.Posts;
  };



}
