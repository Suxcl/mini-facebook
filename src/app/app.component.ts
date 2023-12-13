import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


import { User } from './models/user.model';
import { Post } from './models/post.model';

import { UsersComponent } from './user-folder/users/users.component';
import { BlogComponent } from './blog/blog.component';
import { NavbarComponent } from './navbar/navbar.component';


import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { AuthenticationService} from './services/authentication.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    BlogComponent, 
    NavbarComponent, 
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'mini-facebook';

  users:User[] = [];
  posts:Post[] = [];



  constructor(
    private userService:UserService,
    private postService:PostService,
    ){

      this.userService.addUser$.subscribe(()=>{
        console.log("app.ts catching addUser$");
        
      })

    }

  ngOnInit(): void {
    console.log('app.ts running OnInit');

    this.users = this.userService.getUsers();
    this.posts = this.postService.getPosts();
  }
  

}

