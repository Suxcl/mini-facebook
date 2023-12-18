export class User{
    private id!: number;
    public username!: string;
    private name!: string;
    private surname!: string;
    private password!: string;
    private email!:string;
    private phoneNumber!: number;
    private friendsList:string[];
    
    
    constructor(id:number,username:string, name:string, surname:string, password:string, email:string, phoneNumber:number){
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.friendsList = []
    }

    get Id():number{
        return this.id;
    }
    set Id(id:number){
        this.id = id;
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
    
    get Password():string{
        return this.password;
    }
    set Password(password:string){
        this.password = password;
    }

    get Email():string{
        return this.email;
    }
    set Email(email:string){
        this.email = email;
    }

    get PhoneNumber():number{
        return this.phoneNumber;
    }
    set PhoneNumber(phonenumber:number){
        this.phoneNumber=phonenumber;
    }

    get FriendsList():string[]{
        return this.friendsList;
    }
    addFriend(ktos:User){
        this.friendsList.push(ktos.username);
    }
    removeFriend(ktos:User){
        this.friendsList.splice(this.friendsList.indexOf(ktos.username), 1);        
    }
    haveFriend(u:User):boolean{
        let tmp = this.friendsList;
        if(tmp === undefined){
            return false
        }else{
            let a = false
            tmp.forEach(element => {
                if(element == u.username){
                    a = true
                }
            });
            return a
        }
    }
    toString():string{
        return `${this.id}|${this.username}|${this.name}|${this.surname}|${this.password}|${this.email}|${this.phoneNumber}|${this.friendsList}`;
    }
}