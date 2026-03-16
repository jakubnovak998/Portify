import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { MarketService } from '../../core/services/market.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let marketService: MarketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    marketService = TestBed.inject(MarketService);
    authService.login('demo@portify.com', 'demo123');

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose stocks from market service', () => {
    expect(component.stocks().length).toBeGreaterThan(0);
  });

  it('should expose dashboard stats', () => {
    const stats = component.stats();
    expect(stats.totalTrades).toBeGreaterThan(0);
    expect(stats.winRate).toBeGreaterThanOrEqual(0);
  });

  it('should expose portfolioValue', () => {
    expect(component.portfolioValue()).toBeGreaterThan(0);
  });

  it('should expose totalPnl as a number', () => {
    expect(typeof component.totalPnl()).toBe('number');
  });

  it('should expose current user', () => {
    expect(component.currentUser()?.name).toBe('Demo User');
  });

  it('should have symbols list with at least AAPL', () => {
    expect(component.symbols.length).toBeGreaterThan(0);
    expect(component.symbols).toContain('AAPL');
  });

  it('should initialize trade form with defaults', () => {
    expect(component.tradeForm).toBeTruthy();
    expect(component.tradeForm.get('symbol')?.value).toBe('AAPL');
    expect(component.tradeForm.get('type')?.value).toBe('buy');
    expect(component.tradeForm.get('quantity')?.value).toBe(1);
  });

  it('should compute currentPrice > 0 for selected symbol', () => {
    expect(component.currentPrice()).toBeGreaterThan(0);
  });

  it('should compute estimatedTotal > 0', () => {
    expect(component.estimatedTotal()).toBeGreaterThan(0);
  });

  it('should return positive class for positive change', () => {
    expect(component.getChangeClass(5)).toBe('positive');
  });

  it('should return negative class for negative change', () => {
    expect(component.getChangeClass(-3)).toBe('negative');
  });

  it('should return positive class for zero change', () => {
    expect(component.getChangeClass(0)).toBe('positive');
  });

  it('should format volume in millions', () => {
    expect(component.formatVolume(5_000_000)).toBe('5.0M');
  });

  it('should format volume in thousands', () => {
    expect(component.formatVolume(50_000)).toBe('50K');
  });

  it('should format small volume as number string', () => {
    expect(component.formatVolume(500)).toBe('500');
  });

  it('should add trade on submitTrade', () => {
    const initialCount = marketService.trades().length;
    component.tradeForm.setValue({ symbol: 'AAPL', type: 'buy', quantity: 5 });
    component.submitTrade();
    expect(marketService.trades().length).toBe(initialCount + 1);
  });

  it('should set trade success message after trade', () => {
    component.tradeForm.setValue({ symbol: 'AAPL', type: 'buy', quantity: 5 });
    component.submitTrade();
    expect(component.tradeSuccess()).toBeTruthy();
  });

  it('should not submit invalid trade form (quantity 0)', () => {
    component.tradeForm.get('quantity')?.setValue(0);
    const initialCount = marketService.trades().length;
    component.submitTrade();
    expect(marketService.trades().length).toBe(initialCount);
  });
});
