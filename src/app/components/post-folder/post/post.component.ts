import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { PostDateDirective } from '../../../directives/post-date.directive';
import { CommentComponent } from '../../comments-folder/comment/comment.component';
import { CommentsComponent } from '../../comments-folder/comments/comments.component';

@Component({
  providers: [DatePipe],
  standalone: true,
  selector: 'app-post',
  styleUrls: ['./post.component.css'],
  imports: [CommonModule, PostDateDirective, CommentComponent, CommentsComponent],
  templateUrl: './post.component.html',
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
