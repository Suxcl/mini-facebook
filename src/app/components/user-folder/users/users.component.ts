import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

import { UserComponent } from '../user/user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';

import { SearchUsersPipe } from '../../../pipes/search-users.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    UserComponent,
    EditUserComponent,
    RouterModule,
    FormsModule,
    SearchUsersPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent  implements OnInit{
  @Input() users!:User[];
  selected:number;
  searchString:string = "";


  constructor(
    private userService:UserService,
    private router:Router,
  ){
    this.selected = -1;
    console.log("users.ts constructor");

  }

  public select(which:number):void {
    // console.log("select function od userList "+ which);
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

  showProfile(index:number):void{
    this.selected = index;
    console.log(`users.ts Redirecting to |${this.users[index].Username}| Profile with index |${index}|`);
    // this.router.navigate(['/show-user',index, this.users, this.users[index]]);
    this.router.navigate(['/show-user',index]);
  }



  ngOnInit(): void {
    
  }
}

