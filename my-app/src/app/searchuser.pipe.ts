import { Pipe, PipeTransform } from '@angular/core';
import { User } from './core/models/User';

@Pipe({
  name: 'searchuser'
})
export class SearchuserPipe implements PipeTransform {

  transform(users: User[], searchInput: string): User[] {
    if(searchInput==''){
      return null;
    }
    else {
      return users.filter(({emailId}) => {
        return emailId.includes(searchInput);
      });
    }
  }

}
