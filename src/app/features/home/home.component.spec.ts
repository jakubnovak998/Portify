import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthService } from '../../core/services/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 features', () => {
    expect(component.features.length).toBe(6);
  });

  it('should have 4 stats', () => {
    expect(component.stats.length).toBe(4);
  });

  it('should expose isLoggedIn signal as false initially', () => {
    expect(component.isLoggedIn()).toBe(false);
  });

  it('should reflect logged in state', () => {
    authService.login('demo@portify.com', 'demo123');
    expect(component.isLoggedIn()).toBe(true);
  });

  it('should render hero title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-title')).toBeTruthy();
  });

  it('should render features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    expect(featureCards.length).toBe(6);
  });

  it('should show get-started link when not logged in', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/register');
  });

  it('should show dashboard link when logged in', () => {
    authService.login('demo@portify.com', 'demo123');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/dashboard');
  });

  it('should have all feature titles defined', () => {
    component.features.forEach((f) => {
      expect(f.title).toBeTruthy();
      expect(f.description).toBeTruthy();
      expect(f.icon).toBeTruthy();
    });
  });

  it('should render stats banner', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.stats-banner')).toBeTruthy();
  });

  it('should render CTA section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cta-section')).toBeTruthy();
  });
});
