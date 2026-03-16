import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { provideRouter } from '@angular/router';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        AuthService,
      ],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  function runGuard(): unknown {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  }

  it('should return true when user is logged in', () => {
    authService.login('demo@portify.com', 'demo123');
    const result = runGuard();
    expect(result).toBe(true);
  });

  it('should return a UrlTree redirect when user is not logged in', () => {
    const result = runGuard();
    expect(result instanceof UrlTree).toBe(true);
  });

  it('should redirect to /login when not authenticated', () => {
    const result = runGuard() as UrlTree;
    expect(result.toString()).toBe('/login');
  });

  it('should allow access after login', () => {
    authService.login('trader@portify.com', 'trade123');
    const result = runGuard();
    expect(result).toBe(true);
  });

  it('should deny access after logout', () => {
    authService.login('demo@portify.com', 'demo123');
    authService.logout();
    const result = runGuard();
    expect(result instanceof UrlTree).toBe(true);
  });
});
