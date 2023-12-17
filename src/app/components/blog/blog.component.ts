import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../user-folder/users/users.component';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';

import { UserService } from '../../services/user.service';
import { PostsComponent } from "../post-folder/posts/posts.component";
import { AddPostComponent } from "../post-folder/add-post/add-post.component";
import { AuthenticationService } from '../../services/authentication.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { HousingService } from '../../services/housing.service';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs';





@Component({
    selector: 'app-blog',
    standalone: true,
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.css',
    imports: [PostsComponent, AddPostComponent, UsersComponent]
})


export class BlogComponent implements OnInit{

  users:User[] = [];
  posts:Post[] = [];
  logged!:User;

  constructor(
    private userService:UserService,
    private postService:PostService,
    private housingService:HousingService,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    ){
      console.log("blog.ts constructor");
      this.users = this.userService.getUsers();
      this.posts = this.postService.getPosts();
      this.logged = this.auth.getLoggedUser();
      

      

    }


  ngOnInit(): void {  
    console.log("blog.ts OnInit");
  }



  // Users

  // Posts

  addPost(newpost:Post){
    console.log('blog.ts addPost metod '+newpost.Username);
    console.log('blog.ts addPost metod '+newpost.Content);
    this.posts.push(newpost);
  }
}

// bootstrapApplication(AppComponent,{
//   providers: [provideRouter(routes)]
// })
