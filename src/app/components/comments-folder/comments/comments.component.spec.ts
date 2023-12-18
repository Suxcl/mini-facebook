import { Component, Input } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { CommentComponent } from "../comment/comment.component";

@Component({
    selector: 'app-comments',
    standalone: true,
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
    imports: [CommentComponent]
})
export class CommentsComponent {
  @Input() comments: Comment[] = [];

  // For demonstration purposes, you may need to fetch comments from a service.
  // This is just a placeholder, update it as needed.
  ngOnInit() {
    // Fetch comments using a service or provide them from a parent component
    // this.comments = this.commentService.getComments();
  }
}