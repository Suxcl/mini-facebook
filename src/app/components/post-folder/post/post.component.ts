import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from '../../../models/user.model';
import { Post } from '../../../models/post.model';
import { Comment } from '../../../models/comment.model';

import { PostService } from '../../../services/post.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommentsService } from '../../../services/comments.service';

import { PostDateDirective } from '../../../directives/post-date.directive';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommentComponent } from '../../comments-folder/comment/comment.component';
import { CommentsComponent } from '../../comments-folder/comments/comments.component';



@Component({
  providers: [DatePipe],
  standalone: true,
  selector: 'app-post',
  styleUrls: ['./post.component.css'],
  imports: [CommonModule, PostDateDirective, CommentComponent, CommentsComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post!:Post
  @Input() post_id_in_service!:number;
  @Input() your_profile!:boolean;


  toggle_like!:boolean;
  toggle_dislike!:boolean;
  selectedItem = 0;
  count = 2;

  logUser!:User;  
  post_comments!:Comment[];

  comment_form!:FormGroup;

  constructor
  (
    private postService:PostService,
    private auth:AuthenticationService,
    private commentService:CommentsService,
    private fb:FormBuilder,
  ){
    
  }
  ngOnInit(){
    this.logUser = this.auth.getLoggedUser();
    // this.post_comments = this.commentService.getPostComments(this.post);
    if(this.logUser){
      if(this.post.userLikesPost(this.logUser.username)){
        this.toggle_like = true;
      }
      if(this.post.userDislikesPost(this.logUser.username)){
        this.toggle_dislike = true;
      }
      
    }
    
    this.comment_form = this.fb.group({
      content: ['', Validators.required]
    })
    console.log(this.logUser.username);
    console.log(this.post.Comments);
    console.log("HOHO",this.auth.isSomeoneLoggedIn())
  }

  // post button handling
  likePost(){ // 
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
    console.log('addComment launching')
    if(this.auth.isSomeoneLoggedIn()){
      let c:Comment = new Comment(
        this.commentService.getUniqueId(),
        this.comment_form.value.content,
        this.logUser.username,
        this.post.Id,
      )
      
      this.postService.addComment(c, this.post)
    }
    // toast that tou have to be logged
    this.comment_form.setValue({content:''})
  }
  
  // editComment(comment:Comment){
    
  // }

  // deleteComment(comment:Comment){

  // }
  // // owner post handling
  editPost(){
    
  }

  deletePost(){
    this.postService.removePost(this.post);
  }
}
