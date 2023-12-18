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
import { SnackbarService } from '../../../services/snackbar.service';


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
  allRequests:Invitation[] = [];


  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private postService: PostService,
    private invitesService:InvitesService,
    private snackBar:SnackbarService
  ){
    console.log("user.ts constructor");
    console.log("user.ts constructor", this.postService.getPosts());
    console.log("user.ts constructor", this.invitesService.getAllInvites());
    const whichStudent = this.route.snapshot.paramMap.get('id');

    this.user = this.userService.getUserByIndexFromList(Number(whichStudent));
    // console.log('user.ts User : '+this.user);
    this.user_posts = this.postService.getUserPosts(this.user);
    // console.log('user.ts User posts: '+this.user_posts);
    this.requests = this.invitesService.getInvites(this.user, statuses.pending);
    // console.log('user.ts User requests: '+this.requests);
    this.allRequests = this.invitesService.getInvites(this.user, -1);
    // console.log('user.ts User allrequests: '+this.allRequests);

    // this.user_friends = this.user.FriendsList;
    console.log('user.ts User friends: '+this.user_friends);

    let logUser = this.auth.getLoggedUser();


    // if user is logged in changing yourProfile accordingly
    if(this.user.Surname === logUser.Surname){
      this.yourProfile = true;
    }else{this.yourProfile = false;}


    // for no undefined friends_list
    if(this.user.FriendsList === undefined){
      this.user_friends = [];
    }else{
      // this.user_friends = this.user.FriendsList;
    }
  }
  ngOnInit(): void {
    console.log("user.ts OnInit");

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
    this.snackBar.openSnackBar("Wysłano zaproszenie")

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
    let user_from = this.userService.getUserByUsername(i.from.username);
    // add each other to friends
    console.log(`user from: ${user_from} user to: ${this.user}`);
    user_from.addFriend(this.user);
    this.user.addFriend(user_from);
    // update users in service and on server
    this.userService.updateUser(this.user);
    this.userService.updateUser(user_from);
    // change status of invite
    this.invitesService.changeStatus(i, statuses.accepted);
    // remove invite from requests shown for current user
    this.requests.splice(this.requests.indexOf(i),1);
  }
  //declining request
  declineInvite(i:Invitation):void{
    this.invitesService.changeStatus(i, statuses.rejected);
    this.requests.splice(this.requests.indexOf(i),1);
  }


  getUserFriends():string[]{
    let tmp = this.user.FriendsList;
    if(tmp === undefined){
      return []
    }else{
      return tmp;
    }
  }




}

