import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { User } from '../../../models/user.model';
import { Post } from '../../../models/post.model';

import { UsersComponent } from '../users/users.component';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { PostService } from '../../../services/post.service';
import { InvitesService } from '../../../services/invites.service';
import { Invitation } from '../../../models/invitation.model';
import { PostsComponent } from '../../post-folder/posts/posts.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [UsersComponent, PostsComponent, CommonModule]
})
export class UserComponent implements OnChanges{
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

    // reading end of route value
    
    const whichStudent = this.route.snapshot.paramMap.get('id');
    console.log("user.ts Getting user index from path: "+whichStudent);

    // getting user from previously reded id
    let check:User = this.userService.getUserByIndexFromList(Number(whichStudent));
    console.log("user.ts Show-User user data: "+Object.values(check));

  
    if(check!=undefined){
      this.user = check;
      this.user_posts = this.postService.getPostsOfUser(check);
      let logUser = this.auth.getLoggedUser();
      this.requests = this.invitesService.getInvites(this.user);
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


  ngOnChanges(): void {
    // console.log('user.ts onInit');
  
  }



  addFriend():void{
    let i:Invitation = new Invitation(this.auth.getLoggedUser(), this.user);
    this.invitesService.addInvite(i);
  }
  removeFriend():void{
    
  }
  getRequests():Invitation[]{
    let tmp:Invitation[] = this.invitesService.getInvites(this.user);
    return tmp;
  }
  getUserFriends():User[]{
    let tmp = this.user.FriendsList;
    if(tmp === undefined){
      return []
    }else{
      return tmp;
    }
  }
  isFriend():boolean{
    let tmp = this.auth.getLoggedUser().FriendsList;
    if(tmp === undefined){
      return false
    }else{
      if(tmp.includes(this.user)){
        return true
      }else{
        return false
      }
    }
  }
  
}