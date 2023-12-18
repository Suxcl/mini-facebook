import { Injectable, EventEmitter} from '@angular/core';
import { Invitation } from '../models/invitation.model';
import { HousingService } from './housing.service';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { statuses } from '../models/invitation.model';
@Injectable({
  providedIn: 'root'
})
export class InvitesService{
  public refreshInvites$: EventEmitter<void> = new EventEmitter<void>();

  Invites:Invitation[] = []


  constructor(
    private housingService:HousingService,
  ) 
  {
    // console.log("user.service constructor");
    this.Invites = this.housingService.getData('Invites');
  }

  addInvite(i:Invitation):void{
    if(this.Invites.filter((Invite)=> {
      console.log(Invite.from, i.from, Invite.to, i.to);
      return Invite.from === i.from && Invite.to === i.to
    })){
      
      console.log('invites.service there is existing invite: '+i);
    }else{
      this.Invites.push(i);
      this.housingService.postData('Invites',i); 
      console.log('invites.service catched sendInvite from user.ts there is no existing invite: '+i);
    }
  }
  changeStatus(i:Invitation, status_to:number):void{
    this.Invites.forEach(element => {
      if(element.from === i.from && element.to === i.to){
        element.status = status_to;
      }
    });
    this.Invites[this.Invites.indexOf(i)].status = status_to;
    this.housingService.putData('Invites',i);
  }

  getInvites(u:User, nr:number): Invitation[]{
    let tmpList:Invitation[] = []
    this.Invites.forEach(element => {
      if(element.to.Surname === u.Surname){
        if(nr === -1){
          tmpList.push(element);  
        }else if(nr in [statuses.pending, statuses.accepted, statuses.rejected]){
          if(element.status === nr){
            tmpList.push(element);
          }
        }
      }
    });
    return tmpList;
  }

}
