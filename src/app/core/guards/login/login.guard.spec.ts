import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../services/http/auth/auth.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  // Mocks
  const authServiceMock = jasmine.createSpyObj('authServiceMock', ['login']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard, { provide: AuthService, useValue: authServiceMock }],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if user is logged in', () => {
    authServiceMock.isLoggedIn = true;
    expect(guard.canActivate()).toBe(false);
  });

  it('should return true if user is not logged in', () => {
    authServiceMock.isLoggedIn = false;
    expect(guard.canActivate()).toBe(true);
  });
});
