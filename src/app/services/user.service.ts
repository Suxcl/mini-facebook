import { EventEmitter, Injectable, numberAttribute } from '@angular/core';
import { HousingService } from './housing.service';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public refreshUsers$: EventEmitter<void> = new EventEmitter<void>();

  public addUser$: EventEmitter<{user:User}> = new EventEmitter<{user:User}>();

  // dataUsers = [
  //   ["user1", "Jan", "Kowalski", "haslo123", "jan.kowalski@email.com", "123-456-7890"],
  //   ["user2", "Anna", "Nowak", "securepass", "anna.nowak@email.com", "987-654-3210"],
  //   ["user3", "Piotr", "Wiśniewski", "pass123", "piotr.wisniewski@email.com", "456-789-0123"],
  //   ["user4", "Marta", "Dąbrowska", "marta123", "marta.dabrowska@email.com", "789-012-3456"],
  //   ["user5", "Kamil", "Lis", "lis2023", "kamil.lis@email.com", "210-987-6543"],
  //   ["user6", "Agnieszka", "Kowalczyk", "agnes123", "agnieszka.kowalczyk@email.com", "654-321-0987"],
  //   ["user7", "Mateusz", "Zieliński", "mateuszpass", "mateusz.zielinski@email.com", "876-543-2109"],
  //   ["user8", "Ola", "Szymańska", "ola2023", "ola.szymanska@email.com", "321-654-0987"],
  //   ["user9", "Bartosz", "Wójcik", "bartekpass", "bartosz.wojcik@email.com", "543-789-0123"],
  //   ["user10", "Karolina", "Kaczmarek", "karol2023", "karolina.kaczmarek@email.com", "987-210-6543"],
  //   ["user11", "Marcin", "Piotrowski", "marcinpass", "marcin.piotrowski@email.com", "234-567-8901"],
  //   ["user12", "Natalia", "Józefowicz", "natalia2023", "natalia.jozefowicz@email.com", "890-123-4567"],
  //   ["user13", "Paweł", "Zawadzki", "pawel123", "pawel.zawadzki@email.com", "567-890-1234"],
  //   ["user14", "Katarzyna", "Mazur", "kasia2023", "katarzyna.mazur@email.com", "432-109-8765"],
  //   ["user15", "Rafał", "Kowal", "rafalpass", "rafal.kowal@email.com", "678-901-2345"],
  //   ["user16", "Dominika", "Lewandowska", "domi123", "dominika.lewandowska@email.com", "901-234-5678"],
  //   ["user17", "Łukasz", "Jastrzębski", "lukasz2023", "lukasz.jastrzebski@email.com", "345-678-9012"],
  //   ["user18", "Weronika", "Kowalewska", "weronika123", "weronika.kowalewska@email.com", "789-012-3456"],
  //   ["user19", "Szymon", "Sikora", "szympass", "szymon.sikora@email.com", "210-543-6789"],
  //   ["user20", "Aleksandra", "Górska", "ola123", "aleksandra.gorska@email.com", "456-789-0123"],
  //   ["user21", "Kacper", "Kamiński", "kacperpass", "kacper.kaminski@email.com", "654-321-0987"],
  //   ["user22", "Kinga", "Tomczak", "kinga2023", "kinga.tomczak@email.com", "876-543-2109"],
  //   ["user23", "Artur", "Adamczyk", "artur123", "artur.adamczyk@email.com", "321-654-0987"],
  //   ["user24", "Patrycja", "Malinowska", "pati2023", "patrycja.malinowska@email.com", "543-789-0123"],
  //   ["user25", "Dawid", "Czarnecki", "dawidpass", "dawid.czarnecki@email.com", "987-210-6543"],
  //   ["user26", "Julia", "Kurek", "julia123", "julia.kurek@email.com", "234-567-8901"],
  //   ["user27", "Mikołaj", "Kołodziej", "mikolaj2023", "mikolaj.kolodziej@email.com", "890-123-4567"],
  //   ["user28", "Monika", "Olszewska", "monika2023", "monika.olszewska@email.com", "567-890-1234"],
  //   ["user29", "Radosław", "Pawlak", "radopass", "radoslaw.pawlak@email.com", "432-109-8765"],
  //   ["user30", "Izabela", "Sobczyk", "izabela123", "izabela.sobczyk@email.com", "901-234-5678"]
  // ]

  Users:User[]=[];
  private url = 'http://51.83.130.126:3000';

  constructor(
    private housingService: HousingService,
    private httpClient: HttpClient,
  ) {
    console.log("user.service constructor");
    console.log("user.service constructor reading users from db");
    this.Users = this.housingService.getUsers();    
  }

  getUsers():User[]{
    return this.Users;
  }
  getUsersObs():Observable<any>{
    return this.httpClient.get<any>(this.url+'/Users')
  }

  getUserbyId(id:number):User{
    for(let user of this.Users){
      if (user.Id==id) {
        return user;
      }
    }
    return {} as User;
  }
  getUserByIndexFromList(nr:number):User{
    console.log("THIS USERS: "+this.Users);
    console.log("THIS USERS: "+this.Users[nr]);
    return this.Users[nr];
  }
  
  getUserByUsername(username:string):User{
    for(let user of this.Users){
      if (user.Username==username) {
        return user;
      }
    } 
    return {} as User;
  }

  addUser(user: User):void{
    this.Users.push(user); // adding user to list in service
    this.housingService.postUser(user); // add user to JSON server
    console.log("user.service " + this.Users );
    this.refreshUsers$.emit(); // emit event to refresh displays of users
  }

  updateUser(user:User, id:number):void{
    this.Users[id] = user;
    this.refreshUsers$.emit();
  }
  removeUser(id:number):void{
    delete this.Users[id];
    this.refreshUsers$.emit();
  }

  removeFriend(u:User, u2:User):void{
    for(let el of this.Users){
      if(el.Surname==u.Surname){
        el.FriendsList.splice(el.FriendsList.indexOf(u2), 1);
      }
    }
    this.housingService.putUser(u)
    this.refreshUsers$.emit();
  }

  getUniqueId():number{
    return this.Users.length+1;
  } 

}
