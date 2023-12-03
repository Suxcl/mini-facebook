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


  constructor(
    private userService:UserService,
    private router:Router){
    this.selected = -1;
    this.users = this.userService.getUsers();
    console.log("users.ts constructor"+this.users);
    this.userService.refreshUsers$.subscribe(()=>{
      console.log("users.ts refreshing users");
      this.users = this.userService.getUsers();
      
      
      // window.location.reload();
    })
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


  ngOnInit(): void {
      // console.log("users.ts OnInit");
      this.users = this.userService.getUsers();
      console.log("users.ts oninit"+this.users);
  }
}

