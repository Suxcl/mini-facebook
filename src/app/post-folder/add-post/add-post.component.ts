import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [PostComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
  providers: [PostService,AuthenticationService]
})
export class AddPostComponent implements OnInit{
  form4addpost:FormGroup;

  constructor(
    private router: Router,
    private postService: PostService,
    private authenticationService: AuthenticationService
  ) {
    this.form4addpost = new FormGroup({
      content: new FormControl([
        Validators.required,
        Validators.maxLength(200)
      ])
    })
  }

  ngOnInit(): void {
    console.log("add-post initialised");
  }
  
  doAddPost(){
    console.log('addPost form', this.form4addpost);
    if (this.authenticationService.isSomeoneLoggedIn()) {
      const user = this.authenticationService.getLoggedUser();
      this.postService.addPost(
        user.Username,
        this.form4addpost.value.content
        );
    }else{
      console.log('add post no user ERR');
    }
  }
}
