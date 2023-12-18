import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { PostDateDirective } from '../../../directives/post-date.directive';
import { CommentComponent } from '../../comments-folder/comment/comment.component';
import { CommentsComponent } from '../../comments-folder/comments/comments.component';
import { DatePipe } from '@angular/common';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';

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
  @Input() post_id_in_service!:number;
  @Input() your_profile!:boolean;


  toggle_like!:boolean;
  toggle_dislike!:boolean;
  

  logUser!:User;

  constructor
  (
    private postService:PostService,
    private auth:AuthenticationService,
  ){

  }
  ngOnInit(){
    this.logUser = this.auth.getLoggedUser();
    if(this.logUser){
      if(this.post.userLikesPost(this.logUser.username)){
        this.toggle_like = true;
      }
      if(this.post.userDislikesPost(this.logUser.username)){
        this.toggle_dislike = true;
      }
      
    }
  }

  // post button handling
  likePost(){ // tu są warunki
    if(this.auth.isSomeoneLoggedIn() 
    && !this.post.userDislikesPost(this.logUser.username) 
    && this.post.Username !== this.logUser.username){
      if(this.post.userLikesOrUnlikes(this.logUser.username)){
        this.postService.unlikePost(this.post, this.logUser);
        this.toggle_like = false;
      }else{
        this.postService.likePost(this.post, this.logUser);
        this.toggle_like = true;
      }
    }else{
      // toast muszisz byc zalogowany lub nie lubisz tego posta
    }
    
  }

  dislikePost(){
    if(this.auth.isSomeoneLoggedIn() 
    && !this.post.userLikesPost(this.logUser.username) 
    && this.post.Username !== this.logUser.username){
      if(this.post.userLikesOrUnlikes(this.logUser.username)){
        this.postService.undislikePost(this.post, this.logUser);
        this.toggle_dislike = false;
      }else{
        this.postService.dislikePost(this.post, this.logUser);
        this.toggle_dislike = true;
      }
      
    }else{
      //toast musisz być zalogowany lub lubisz ten post
    }
    
  }
  // comment handling
  addComment(){

  }
  
  editComment(){
    
  }

  deleteComment(){

  }
  // owner post handling
  editPost(){

  }

  deletePost(){
    this.postService.removePost(this.post);
  }
}
