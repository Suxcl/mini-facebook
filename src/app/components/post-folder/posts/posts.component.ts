import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { PostComponent } from "../post/post.component";
import { CommentComponent } from '../comment/comment.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
    selector: 'app-posts',
    standalone: true,
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.css',
    imports: [CommonModule, PostComponent,CommentComponent,CommentsComponent]
})
export class PostsComponent{
  @Input() posts!:Post[];
  @Input() your_profile!:boolean;

  constructor
  (
    private postService:PostService
  ) 
  {}

  
  
}
