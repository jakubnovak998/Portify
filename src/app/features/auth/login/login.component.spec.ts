import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.loginForm.invalid).toBe(true);
  });

  it('should validate email field as required', () => {
    component.emailControl.setValue('');
    component.emailControl.markAsTouched();
    expect(component.emailControl.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    component.emailControl.setValue('notanemail');
    expect(component.emailControl.errors?.['email']).toBeTruthy();
  });

  it('should validate password as required', () => {
    component.passwordControl.setValue('');
    component.passwordControl.markAsTouched();
    expect(component.passwordControl.errors?.['required']).toBeTruthy();
  });

  it('should validate password minimum length', () => {
    component.passwordControl.setValue('abc');
    expect(component.passwordControl.errors?.['minlength']).toBeTruthy();
  });

  it('should be valid with correct values', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password123' });
    expect(component.loginForm.valid).toBe(true);
  });

  it('should fill demo credentials', () => {
    component.fillDemo();
    expect(component.loginForm.get('email')?.value).toBe('demo@portify.com');
    expect(component.loginForm.get('password')?.value).toBe('demo123');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword()).toBe(false);
    component.togglePassword();
    expect(component.showPassword()).toBe(true);
    component.togglePassword();
    expect(component.showPassword()).toBe(false);
  });

  it('should set error message on invalid login', async () => {
    vi.useFakeTimers();
    component.loginForm.setValue({ email: 'wrong@email.com', password: 'wrongpass' });
    component.onSubmit();
    await vi.runAllTimersAsync();
    expect(component.errorMessage()).toBeTruthy();
    expect(component.isLoading()).toBe(false);
    vi.useRealTimers();
  });

  it('should not submit if form is invalid', () => {
    const loginSpy = vi.spyOn(authService, 'login');
    component.onSubmit();
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('should mark form as touched on invalid submit', () => {
    component.onSubmit();
    expect(component.emailControl.touched).toBe(true);
    expect(component.passwordControl.touched).toBe(true);
  });

  it('should set loading to true while submitting', () => {
    component.loginForm.setValue({ email: 'demo@portify.com', password: 'demo123' });
    component.onSubmit();
    expect(component.isLoading()).toBe(true);
  });

  it('should navigate to dashboard on successful login', async () => {
    vi.useFakeTimers();
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.loginForm.setValue({ email: 'demo@portify.com', password: 'demo123' });
    component.onSubmit();
    await vi.runAllTimersAsync();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    vi.useRealTimers();
  });

  it('should have empty error message initially', () => {
    expect(component.errorMessage()).toBe('');
  });
});
