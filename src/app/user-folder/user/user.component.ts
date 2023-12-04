import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';


import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PostService } from '../../services/post.service';

import { EditUserComponent } from '../edit-user/edit-user.component';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userID!:number;
  users!:User[];
  user!:User;
  


  constructor(
    private route:ActivatedRoute,
    private auth:AuthenticationService,
  ){


  }
}
