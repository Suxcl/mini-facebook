import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers:[UserService],
})
export class UserComponent  implements OnInit{

  users:User[]=[];



  constructor(private userService:UserService){}




  ngOnInit(): void {
      console.log("User component OnInit");
      this.users = this.userService.getUsers();
  }
}

