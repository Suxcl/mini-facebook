import { HousingService } from './housing.service';
import { Injectable, EventEmitter, OnInit} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService{

  public refreshPosts$: EventEmitter<void> = new EventEmitter<void>();
  Posts:Post[]=[];
  PostsSubject$ = new BehaviorSubject<Post[]>([]);
  loggedUser!:User;
  constructor
  (
    private housingService: HousingService,
  ) 
  {
    this.Posts = this.housingService.getData('Posts');
    this.loggedUser
  }
  // post buttons actions
  likePost(post:Post, user:User):void{
    post.like(user.username)
    this.Posts[this.Posts.indexOf(post)] = post;
    this.housingService.putData('Posts',post);
  }
  unlikePost(post:Post, user:User):void{
    post.unlike(user.username)
    this.Posts[this.Posts.indexOf(post)] = post;
    this.housingService.putData('Posts',post);
  }
  dislikePost(post:Post, user:User):void{
    post.dislike(user.username)
    this.housingService.putData('Posts',post);
  }
  undislikePost(post:Post, user:User):void{
    post.undislike(user.username)
    this.housingService.putData('Posts',post);
  }

  // basic post actions
  addPost(newpost:Post):void{
    this.housingService.postData('Posts',newpost);
    this.Posts.push(newpost)
  }
  removePost(post:Post):void{
    this.Posts.splice(this.Posts.indexOf(post),1);
    this.housingService.deleteData('Posts',post.Id);
  }
  getPosts():Post[]{
    return this.Posts;
  };

  getUserPosts(u:User):Post[]{
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

  addComment(c:Comment, p:Post){
    console.log("AHA", c, p)
    p.addComment(c);
    this.housingService.putData('Posts',p);
  }
}
