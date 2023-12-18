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
  InvitesSubject = new BehaviorSubject<Invitation[]>([]);

  constructor(
    private housingService:HousingService,
  ) 
  {
    console.log("user.service constructor");
    this.update()
    
  }

  update():void{
    this.updateInvites(this.housingService.getData('Invites'));
  }
  updateInvites(invites:Invitation[]){
    this.Invites = invites;
    this.InvitesSubject.next(this.Invites);
  } 
  addInvite(i:Invitation):void{
    if(!(this.Invites.filter((Invite)=>Invite.from === i.from && Invite.to === i.to).length == 0)){
      this.Invites.push(i);
      this.housingService.postData('Invites',i); 
      this.update()
    }
    
  }
  changeStatus(i:Invitation, status_to:number):void{
    this.Invites.forEach(element => {
      if(element.from === i.from && element.to === i.to){
        element.status = status_to;
      }
    });
    this.housingService.putData('Invites',i);
    this.update()
  }

  getInvites(u:User, nr:number){
    let tmpList:Invitation[] = []
      this.Invites.forEach(element => {
        if(element.to.Surname === u.Surname && element.status === nr){
          tmpList.push(element);
        }
    });
    // this.updateInvites(tmpList);
    return tmpList;
  }

  getInvitesAsObservable():Observable<any>{
    return this.InvitesSubject.asObservable();
  }
}
