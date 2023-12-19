import { Injectable, EventEmitter} from '@angular/core';
import { HousingService } from './housing.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  // Comments!: Comment[];
  constructor(
    private housingService: HousingService,
  ) { 
    // this.Comments = this.housingService.getData('Comments');
  }
  
  addComment(comment: Comment, p:Post) {
    console.log('adding comment ')
    p.Comments.push(comment);
    this.housingService.postData('Posts', p)
  }
  getUniqueId():number{
    return Date.now();
  }
}
