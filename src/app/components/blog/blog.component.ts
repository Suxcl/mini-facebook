import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../user-folder/users/users.component';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { Invitation } from '../../models/invitation.model';
import { UserService } from '../../services/user.service';
import { InvitesService } from '../../services/invites.service';
import { CommentsService } from '../../services/comments.service';
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
  invites:Invitation[] = [];
  Comments:Comment[] = [];
  logged!:User;

  constructor(
    private userService:UserService,
    private postService:PostService,
    private inviteService:InvitesService,
    private commentService:CommentsService,
    private auth:AuthenticationService,
    
    ){
      // console.log("blog.ts constructor");
    }


  ngOnInit(): void {
    console.log("blog.ts OnInit");
    this.users = this.userService.getUsers();
    this.posts = this.postService.getPosts();
    this.invites = this.inviteService.getAllInvites();
    // this.Comments = this.commentService.getComments();
    this.logged = this.auth.getLoggedUser();
  }


}

