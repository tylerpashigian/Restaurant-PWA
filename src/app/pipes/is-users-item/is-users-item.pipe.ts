import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Pipe({
  name: 'isUsersItem'
})
@Pipe({name: 'isUsersItem'})
export class IsUsersItemPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  transform(value: string): boolean {    
    return value === this.authService.user?.uid;
  }
}
