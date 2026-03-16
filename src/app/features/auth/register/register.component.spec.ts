import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../core/services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.registerForm.invalid).toBe(true);
  });

  it('should validate name as required', () => {
    component.nameControl.setValue('');
    component.nameControl.markAsTouched();
    expect(component.nameControl.errors?.['required']).toBeTruthy();
  });

  it('should validate name minimum length', () => {
    component.nameControl.setValue('A');
    expect(component.nameControl.errors?.['minlength']).toBeTruthy();
  });

  it('should validate email format', () => {
    component.emailControl.setValue('invalid-email');
    expect(component.emailControl.errors?.['email']).toBeTruthy();
  });

  it('should validate password minimum length', () => {
    component.passwordControl.setValue('12345');
    expect(component.passwordControl.errors?.['minlength']).toBeTruthy();
  });

  it('should detect password mismatch', () => {
    component.registerForm.patchValue({
      name: 'Test',
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'different',
    });
    expect(component.registerForm.errors?.['passwordMismatch']).toBeTruthy();
  });

  it('should be valid with matching passwords', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'newtest@test.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(component.registerForm.valid).toBe(true);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword()).toBe(false);
    component.togglePassword();
    expect(component.showPassword()).toBe(true);
  });

  it('should toggle confirm password visibility', () => {
    expect(component.showConfirm()).toBe(false);
    component.toggleConfirm();
    expect(component.showConfirm()).toBe(true);
  });

  it('should show error for duplicate email', async () => {
    vi.useFakeTimers();
    component.registerForm.setValue({
      name: 'Demo User',
      email: 'demo@portify.com',
      password: 'demo123',
      confirmPassword: 'demo123',
    });
    component.onSubmit();
    await vi.runAllTimersAsync();
    expect(component.errorMessage()).toBeTruthy();
    vi.useRealTimers();
  });

  it('should navigate to dashboard on successful registration', async () => {
    vi.useFakeTimers();
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.registerForm.setValue({
      name: 'Brand New User',
      email: 'brand.new@example.com',
      password: 'newpass123',
      confirmPassword: 'newpass123',
    });
    component.onSubmit();
    await vi.runAllTimersAsync();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    vi.useRealTimers();
  });

  it('should not submit invalid form', () => {
    const registerSpy = vi.spyOn(authService, 'register');
    component.onSubmit();
    expect(registerSpy).not.toHaveBeenCalled();
  });
});
