import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have no current user on init', () => {
      expect(service.currentUser()).toBeNull();
    });

    it('should not be logged in on init', () => {
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('login', () => {
    it('should return true for valid credentials', () => {
      const result = service.login('demo@portify.com', 'demo123');
      expect(result).toBe(true);
    });

    it('should set current user on successful login', () => {
      service.login('demo@portify.com', 'demo123');
      expect(service.currentUser()).toBeTruthy();
      expect(service.currentUser()?.email).toBe('demo@portify.com');
      expect(service.currentUser()?.name).toBe('Demo User');
    });

    it('should set isLoggedIn to true on successful login', () => {
      service.login('demo@portify.com', 'demo123');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false for invalid email', () => {
      const result = service.login('wrong@email.com', 'demo123');
      expect(result).toBe(false);
    });

    it('should return false for invalid password', () => {
      const result = service.login('demo@portify.com', 'wrongpassword');
      expect(result).toBe(false);
    });

    it('should not set user on failed login', () => {
      service.login('wrong@email.com', 'wrongpass');
      expect(service.currentUser()).toBeNull();
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should work with second mock user', () => {
      const result = service.login('trader@portify.com', 'trade123');
      expect(result).toBe(true);
      expect(service.currentUser()?.name).toBe('Pro Trader');
    });

    it('should not expose password in current user', () => {
      service.login('demo@portify.com', 'demo123');
      const user = service.currentUser() as any;
      expect(user.password).toBeUndefined();
    });
  });

  describe('register', () => {
    it('should return true for a new user', () => {
      const result = service.register('New User', 'new@example.com', 'password123');
      expect(result).toBe(true);
    });

    it('should set current user after successful registration', () => {
      service.register('New User', 'new@example.com', 'password123');
      expect(service.currentUser()?.email).toBe('new@example.com');
      expect(service.currentUser()?.name).toBe('New User');
    });

    it('should return false if email already exists', () => {
      const result = service.register('Dup User', 'demo@portify.com', 'newpass');
      expect(result).toBe(false);
    });

    it('should allow login after registration', () => {
      service.register('Test User', 'test@new.com', 'testpass');
      service.logout();
      const loginResult = service.login('test@new.com', 'testpass');
      expect(loginResult).toBe(true);
    });
  });

  describe('logout', () => {
    it('should clear current user', () => {
      service.login('demo@portify.com', 'demo123');
      service.logout();
      expect(service.currentUser()).toBeNull();
    });

    it('should set isLoggedIn to false after logout', () => {
      service.login('demo@portify.com', 'demo123');
      service.logout();
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return null when not logged in', () => {
      expect(service.getCurrentUser()).toBeNull();
    });

    it('should return current user when logged in', () => {
      service.login('demo@portify.com', 'demo123');
      expect(service.getCurrentUser()?.email).toBe('demo@portify.com');
    });
  });
});
