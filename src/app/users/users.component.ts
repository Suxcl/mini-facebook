import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers:[UserService],
})
export class UsersComponent  implements OnInit{

  users:User[]=[];



  constructor(private userService:UserService){}




  ngOnInit(): void {
      console.log("User component OnInit");
      this.users = this.userService.getUsers();
  }
}

