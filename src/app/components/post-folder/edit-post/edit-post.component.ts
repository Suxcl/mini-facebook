import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { uniqueUsernameValidator } from '../../../validators/uniqueUsernameValidator';
import { Post } from '../../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PostService } from '../../../services/post.service';



@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  @Input() post!:Post;
  @Output() doEditInParent = new EventEmitter<{post:Post}>();
  

  form:FormGroup;
  constructor
  (
    private postService:PostService,
    
  )
  {
    this.form = new FormGroup({
      content: new FormControl(
        [Validators.required],
        [Validators.maxLength(300)]
      )
    });

  }
  doEditPost(){
    let new_content = this.form.value.content
    this.post.Content = new_content
    this.doEditInParent.emit({ post: this.post });
  }

}
