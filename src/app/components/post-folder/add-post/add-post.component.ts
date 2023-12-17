import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';
import { FormControl, FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { PostComponent } from '../post/post.component';
import { User } from '../../../models/user.model';

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
  @Output() addPostInParent =  new EventEmitter<{newPost:Post}>();

  constructor(
    private router: Router,
    private postService: PostService,
    private authenticationService: AuthenticationService,
    private fb:FormBuilder
  ) {

    this.form4addpost = fb.group({
      // title:['', Validators.required,Validators.maxLength(50)],
      content: ['']
    })

  }

  ngOnInit(): void {
    console.log("add-post initialised");
  }

  doAddPost(){
    console.log('addPost form', this.form4addpost);
    if (this.authenticationService.isSomeoneLoggedIn()) {
      let user = this.authenticationService.getLoggedUser();
      this.user = this.authenticationService.getLoggedUser();

      // console.log("add-post.ts user " + Object.keys(user) , Object.values(user));
      // console.log('add-post.ts user username' + user.Username);

      console.log("add-post.ts user " + Object.keys(this.user) , Object.values(user));
      console.log('add-post.ts user username ' + this.user.Username);
      let p:Post  = new Post(this.postService.getUniqueId(),user.Username, this.form4addpost.value.content);
      this.addPostInParent.emit({newPost: p});
    }else{
      console.log('add post no user ERR');
    }
  }
}
