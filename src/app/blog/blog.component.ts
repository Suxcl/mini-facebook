import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../user-folder/users/users.component';
import { UserService } from '../services/user.service';
import { PostsComponent } from "../post-folder/posts/posts.component";
import { AddPostComponent } from "../post-folder/add-post/add-post.component";

@Component({
    selector: 'app-blog',
    standalone: true,
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.css',
    providers: [UserService],
    imports: [CommonModule, UsersComponent, PostsComponent, AddPostComponent]
})
export class BlogComponent implements OnInit{
  constructor(private userService:UserService){}
  ngOnInit(): void {
      
  }
}
