  import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    UserComponent,
    EditUserComponent,
    RouterModule,
    FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers:[UserService],
})
export class UsersComponent  implements OnInit{

  users:User[]=[];
  selected:number;


  constructor(private userService:UserService){
    this.selected = -1;
  }

  public select(which:number):void {
    console.log("slect function od userList "+ which);
    this.selected = which;
  }

  save(user:User):void{
    this.users[this.selected] = user;
    this.selected =-1;
  }


  doEditUser(data:{user:User, which:number}){
    this.users[data.which] = data.user;
    console.log("after edit", this.users);
    this.selected = -1;
  }

  doLoginUser(data:{login:string, password:string}){
    
  }

  ngOnInit(): void {
      console.log("User component OnInit");
      this.users = this.userService.getUsers();
  }
}
