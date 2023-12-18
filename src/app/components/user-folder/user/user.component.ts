import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { User } from '../../../models/user.model';
import { Post } from '../../../models/post.model';

import { UsersComponent } from '../users/users.component';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { PostService } from '../../../services/post.service';
import { InvitesService } from '../../../services/invites.service';
import { Invitation, statuses } from '../../../models/invitation.model';
import { PostsComponent } from '../../post-folder/posts/posts.component';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [UsersComponent, PostsComponent, CommonModule]
})
export class UserComponent implements OnInit{
  user!:User;
  yourProfile:Boolean = false;
  user_posts:Post[] = [];
  user_friends:User[] = [];
  requests:Invitation[] = [];

  
  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private postService: PostService,
    private invitesService:InvitesService,
    
  ){
    console.log("user.ts constructor");    
  }
  ngOnInit(): void {
    console.log("user.ts OnInit");
    const whichStudent = this.route.snapshot.paramMap.get('id');
    console.log("user.ts Getting user index from path: "+whichStudent);

    // getting user from previously reded id
    let check:User = this.userService.getUserByIndexFromList(Number(whichStudent));
    console.log("user.ts Show-User user data: "+Object.values(check));
    if(check!=undefined){
      this.user = check;
      let logUser = this.auth.getLoggedUser();

      // logs for testing
      console.log('user.ts User posts: '+this.user_posts);
      console.log('user.ts User Friends: '+this.user.FriendsList);
      
      // if user is logged in changing yourProfile accordingly
      if(this.user.Surname === logUser.Surname){
        this.yourProfile = true;
      }else{this.yourProfile = false;}

    }else{
      console.log('user.ts There is no user with this index in UserService UserList');
    }
    // for no undefined friends_list
    if(this.user.FriendsList === undefined){
      this.user_friends = [];
    }else{
      this.user_friends = this.user.FriendsList;
    }
  }

  // Button for Sending Invite to User or removing user from Friends
  // checking which form of button to show
  isLoggedUserFriendWithCurrentUser():boolean{
    return this.user.haveFriend(this.auth.getLoggedUser());
  }
  sendInvite():void{
    let i:Invitation = new Invitation(this.invitesService.Invites.length+1, this.auth.getLoggedUser(), this.user);
    this.invitesService.addInvite(i);
    console.log('user.ts sendInvite: '+i);
  }
  removeFriend():void{
    this.userService.removeFriend(this.auth.getLoggedUser(), this.user);
  }


  // --- Invites ---
  //all pending invites
  getRequests():Invitation[]{
    let t = this.invitesService.getInvites(this.user, statuses.pending);
    if(t===undefined){
      return []
    }
    return t;
  }
  // testing purpose all invites
  getAllInvitesToUser():Invitation[]{
    let t = this.invitesService.getInvites(this.user,-1);
    if(t===undefined){
      return []
    }
    return t;

  }
  // accepting request
  acceptInvite(i:Invitation):void{
    let logUser = this.auth.getLoggedUser()
    logUser.addFriend(this.user);
    this.user.addFriend(this.auth.getLoggedUser());
    this.userService.updateUser(this.user);
    this.userService.updateUser(logUser);
    this.invitesService.changeStatus(i, statuses.accepted);
  }
  //declining request

  // checking 



  // --- user info ---

  getUserFriends():User[]{
    let tmp = this.user.FriendsList;
    if(tmp === undefined){
      return []
    }else{
      return tmp;
    }
  }

  //
  

}

