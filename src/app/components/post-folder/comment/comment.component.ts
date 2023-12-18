import { Component, Input } from '@angular/core';
import { Comment } from '../../../models/comment.model';

@Component({
  standalone: true,
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
}