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
  compareInvites(i1:Invitation, i2:Invitation):boolean{
    const keys1 = Object.keys(i1) as (keyof Invitation)[];
    const keys2 = Object.keys(i2) as (keyof Invitation)[];
    for(let key of keys1){
      if(i1[key] !== i2[key]){
        return false;
      }
    }
    return true
  }
  addInvite(i:Invitation):void{
    let found = false
    this.Invites.forEach(element => {
      if(i.from.username === element.from.username && i.to.username === element.to.username){
        found = true;
      }
    })
    if(found){
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
      if(element.to.username === u.username){
        if(nr === -1){
          console.log('check adding invite: '+element);
          tmpList.push(element);  
        }else if(nr in [statuses.pending, statuses.accepted, statuses.rejected]){
          if(element.status === nr){
            console.log('check adding invite: '+element + ' ' + nr);
            tmpList.push(element);
          }
        }
      }
    });
    console.log('invite.service getInvites: '+tmpList);
    return tmpList;
  }
  getAllInvites():Invitation[]{
    return this.Invites
  }

}
