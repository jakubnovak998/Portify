import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { AuthService } from '../../core/services/auth.service';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    const authService = TestBed.inject(AuthService);
    authService.login('demo@portify.com', 'demo123');

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose portfolio data', () => {
    expect(component.portfolio().length).toBeGreaterThan(0);
  });

  it('should compute holdings with P&L data', () => {
    const holdings = component.holdingsWithPnl();
    expect(holdings.length).toBeGreaterThan(0);
    holdings.forEach((h) => {
      expect(h.marketValue).toBeDefined();
      expect(h.pnl).toBeDefined();
      expect(h.pnlPercent).toBeDefined();
      expect(h.allocation).toBeDefined();
    });
  });

  it('should compute allocations that sum to ~100%', () => {
    const total = component.holdingsWithPnl().reduce((s, h) => s + h.allocation, 0);
    expect(Math.abs(total - 100)).toBeLessThan(1);
  });

  it('should compute totalPnlPercent as a number', () => {
    expect(typeof component.totalPnlPercent()).toBe('number');
  });

  it('should return best performer', () => {
    expect(component.bestPerformer()).toBeTruthy();
    expect(component.bestPerformer()?.symbol).toBeDefined();
  });

  it('should return worst performer', () => {
    expect(component.worstPerformer()).toBeTruthy();
  });

  it('best performer pct should be >= worst performer pct', () => {
    const best = component.bestPerformerPct();
    const worst = component.worstPerformerPct();
    expect(best).toBeGreaterThanOrEqual(worst);
  });

  it('should return positive class for positive pnl', () => {
    expect(component.getPnlClass(100)).toBe('positive');
  });

  it('should return negative class for negative pnl', () => {
    expect(component.getPnlClass(-100)).toBe('negative');
  });

  it('should compute portfolioValue > 0', () => {
    expect(component.portfolioValue()).toBeGreaterThan(0);
  });

  it('should have correct market value calculation', () => {
    const item = component.holdingsWithPnl()[0];
    const portfolio = component.portfolio()[0];
    const expected = portfolio.quantity * portfolio.currentPrice;
    expect(Math.abs(item.marketValue - expected)).toBeLessThan(0.01);
  });
});
