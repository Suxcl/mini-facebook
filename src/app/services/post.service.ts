import { HousingService } from './housing.service';
import { Injectable, EventEmitter, OnInit} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{

  public refreshPosts$: EventEmitter<void> = new EventEmitter<void>();
  Posts:Post[]=[];
  PostsSubject$ = new BehaviorSubject<Post[]>([]);

  constructor
  (
    private housingService: HousingService,
    private httpClient: HttpClient,
  ) 
  {
    // console.log("post.service constructor");
    this.Posts = this.housingService.getData('Posts');
  }
  ngOnInit(): void {
      
  }
  addPost(newpost:Post):void{
    this.housingService.postData('Posts',newpost);
    this.Posts.push(newpost)
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
