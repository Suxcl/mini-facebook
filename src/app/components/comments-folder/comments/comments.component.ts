import { Component, Input } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { CommentsService } from '../../../services/comments.service';
import { CommentComponent } from '../comment/comment.component';
import { PostComponent } from '../../post-folder/post/post.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,CommentComponent,PostComponent],
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input() postId: number = 0;
  comments: Comment[] = []; 

  constructor() {

  }

  ngOnInit(){

  }
  

  
}