import { User } from './../models/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsers',
  standalone: true
})
export class SearchUsersPipe implements PipeTransform {

  transform(users: User[], ...args: String[]): User[] {
    let searchString = args[0].toLowerCase();
    if(!searchString){return users}
    const filteredList = users.filter(user =>{
      return user.Username.toLowerCase().includes(searchString);
    })

    return filteredList;
  }

}
