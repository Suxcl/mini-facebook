import { Injectable } from '@angular/core';
import { Invitation } from '../models/invitation.model';
import { HousingService } from './housing.service';
import { User } from '../models/user.model';
import { statuses } from '../models/invitation.model';
@Injectable({
  providedIn: 'root'
})
export class InvitesService{

  Invites:Invitation[] = []
  constructor(
    private housingService:HousingService,
  ) {
    console.log("user.service constructor");
    
    this.Invites = this.housingService.getData('Invites');    
    console.log("user.service constructor read invites from db");
   }

  addInvite(i:Invitation):void{
    
    if(!(this.Invites.filter((Invite)=>Invite.from === i.from && Invite.to === i.to).length == 0)){
      this.Invites.push(i);
      this.housingService.postData('Invites',i);
    }
    
  }
  changeStatus(i:Invitation, status_to:number):void{
    this.Invites.forEach(element => {
      if(element.from === i.from && element.to === i.to){
        element.status = status_to;
      }
    });
  }

  getInvitesFromUser(u:User, status:number = 0):Invitation[]{
    let tmpList:Invitation[] = []

    this.Invites.forEach(element => {
      if(element.from.Surname === u.Surname){
        tmpList.push(element);
      }
    });
    return tmpList;
  }
  getInvitesToUser(u:User):Invitation[]{
    let tmpList:Invitation[] = []
    this.Invites.forEach(element => {
      if(element.to.Surname === u.Surname){
        tmpList.push(element);
      }
    });
    return tmpList;
  }

  getInvites(u:User, nr:number=0):Invitation[]{
    let tmpList:Invitation[] = []
    if (nr === 0){
      this.Invites.forEach(element => {
        if(element.to.Surname === u.Surname){
          tmpList.push(element);
        }
      });
    }else{
      this.Invites.forEach(element => {
        if(element.to.Surname === u.Surname && element.status === nr){
          tmpList.push(element);
        }
      });
    }
    return tmpList;
  }
  
}
