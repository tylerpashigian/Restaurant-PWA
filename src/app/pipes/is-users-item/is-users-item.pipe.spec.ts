import { inject, TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IsUsersItemPipe } from './is-users-item.pipe';

describe('IsUsersItemPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [AuthService],
    });
  });

  it('create an instance', inject([AuthService], (authService: AuthService) => {
    const pipe = new IsUsersItemPipe(authService);
    expect(pipe).toBeTruthy();
  }));
});
