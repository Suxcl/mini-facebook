
import { User } from "./user.model";
export enum statuses{
    'pending',
    'accepted',
    'rejected',
}
export class Invitation {
    public from:User;
    public to:User;
    public status:number = statuses.pending;
    public id;
    constructor(id:number, from:User, to:User){
        this.from = from;
        this.to = to;
        this.id = id;
    }
    acceptInv():void{
        this.from.addFriend(this.to);
        this.to.addFriend(this.from);
        this.status = statuses.accepted;
    }
    rejectInv():void{
        this.status = statuses.rejected;
    }
    get Id():number{
        return this.id;
    }
    set Id(id:number){
        this.id = id;
    }

}
