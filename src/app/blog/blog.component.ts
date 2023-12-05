import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../user-folder/users/users.component';

import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

import { UserService } from '../services/user.service';
import { PostsComponent } from "../post-folder/posts/posts.component";
import { AddPostComponent } from "../post-folder/add-post/add-post.component";
import { AuthenticationService } from '../services/authentication.service';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-blog',
    standalone: true,
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.css',
    providers: [UserService, PostService],
    imports: [CommonModule, UsersComponent, PostsComponent, AddPostComponent]
})
export class BlogComponent implements OnInit{

  users:User[] = [];
  posts:Post[] = [];
  
  receivedRegisteredUser!:User;

  constructor(
    private userService:UserService,
    private postService:PostService,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    ){
      console.log("blog.ts constructor");
      this.users = this.userService.getUsers();
      this.posts = this.postService.getPosts();

      
    }


  ngOnInit(): void {  
    console.log("blog.ts OnInit");
    this.checkForNewUser();
    
  }



  // Users

  getUsers():User[]{
    return this.users;
  }
  

  addUser(u:User){
    this.users.push(u);
  }

  checkForNewUser():void{
    // checking if there is a newly registered user
    // if ther is adding him to usersList
    if(this.auth.isNewUser()){
      this.addUser(this.auth.getLoggedUser());
      this.auth.changeNewUserToFalse();
    }
  }

  // Posts

  addPost(newpost:Post){
    console.log('blog.ts addPost metod '+newpost.Username);
    console.log('blog.ts addPost metod '+newpost.Content);
    this.posts.push(newpost);
  }
}
