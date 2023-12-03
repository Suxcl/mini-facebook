import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { PostComponent } from "../post/post.component";

@Component({
    selector: 'app-posts',
    standalone: true,
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.css',
    providers: [PostService],
    imports: [CommonModule, PostComponent]
})
export class PostsComponent implements OnInit{
  posts:Post[]=[];

  constructor(private postService:PostService) {}

  ngOnInit(): void {
    console.log("Posts component On Init");
    this.posts = this.postService.getPosts();
  }
  
  
}
