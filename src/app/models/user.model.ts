export class User{
    public username!: string;
    public name!: string;
    public surname!: string;
    private password!: string;
    private email!:string;
    private phoneNumber!: number;
    public friendsList:User[];
    
    constructor(username:string, name:string, surname:string, password:string, email:string, phoneNumber:number ){
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.friendsList = [];
    }

    get Username():string{
        return this.username;
    }
    set Username(username:string){
        this.username = username;
    }

    get Name():string{
        return this.name;
    }
    set Name(name:string){
        this.name = name;
    }
    get Surname():string{
        return this.surname;
    }
    set Surname(surname:string){
        this.surname = surname;
    }
    get PhoneNumber():number{
        return this.phoneNumber;
    }
    get Email():string{
        return this.email;
    }
    get FriendsList():User[]{
        return this.friendsList;
    }
    getFriend(ind:number):User{
        return this.friendsList[ind];
    }
    addFriend(ktos:User){
        this.friendsList.push(ktos);
    }
}