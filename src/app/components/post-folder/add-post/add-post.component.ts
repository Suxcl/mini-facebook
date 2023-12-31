import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';
import { FormControl, FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { PostComponent } from '../post/post.component';
import { User } from '../../../models/user.model';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [PostComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent implements OnInit{
  form4addpost:FormGroup;
  user!:User;
  // @Output() addPostInParent =  new EventEmitter<{newPost:Post}>();

  constructor(
    private router: Router,
    private postService: PostService,
    private authenticationService: AuthenticationService,
    private fb:FormBuilder,
    private snackBar:SnackbarService
  ) {

    this.form4addpost = fb.group({
      content: [
        null,
        {
        validators: [Validators.required]
        }
      ]
    })

  }

  ngOnInit(): void {
    console.log("add-post initialised");
  }

  doAddPost(){
    console.log('addPost form', this.form4addpost);
    if (this.authenticationService.isSomeoneLoggedIn()) {
      let user = this.authenticationService.getLoggedUser();
      let p:Post  = new Post(this.postService.getUniqueId(),user.Username, this.form4addpost.value.content);
      console.log("add-post.ts newPost: ", p);
      this.postService.addPost(p);
      this.form4addpost.setValue({
        content:''
      })
    }else{
      console.log('add post no user ERR');
      this.snackBar.openSnackBar("Użytkownik musi być zalogowany");
    }
  }
}
