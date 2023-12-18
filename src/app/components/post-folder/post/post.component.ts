import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { PostDateDirective } from '../../../directives/post-date.directive';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,PostDateDirective],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!:Post
  @Input() your_profile!:boolean

  constructor
  (
    private postService:PostService,
  ){

  }
  ngOnInit(){

  }
  editPost(){

  }

  deletePost(){
    this.postService.removePost(this.post);
  }
}
