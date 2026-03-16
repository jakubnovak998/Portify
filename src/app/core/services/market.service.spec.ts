import { TestBed } from '@angular/core/testing';
import { MarketService } from './market.service';

describe('MarketService', () => {
  let service: MarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('stocks', () => {
    it('should expose stocks signal with data', () => {
      expect(service.stocks()).toBeTruthy();
      expect(service.stocks().length).toBeGreaterThan(0);
    });

    it('should contain AAPL stock', () => {
      const aapl = service.stocks().find((s) => s.symbol === 'AAPL');
      expect(aapl).toBeTruthy();
      expect(aapl?.price).toBeGreaterThan(0);
    });

    it('should contain all required symbols', () => {
      const symbols = service.stocks().map((s) => s.symbol);
      ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'GOOGL', 'NVDA'].forEach((sym) => {
        expect(symbols).toContain(sym);
      });
    });

    it('should have valid stock structure', () => {
      const stock = service.stocks()[0];
      expect(stock.symbol).toBeDefined();
      expect(stock.name).toBeDefined();
      expect(stock.price).toBeGreaterThan(0);
      expect(stock.volume).toBeGreaterThan(0);
    });
  });

  describe('portfolio', () => {
    it('should expose portfolio signal with data', () => {
      expect(service.portfolio()).toBeTruthy();
      expect(service.portfolio().length).toBeGreaterThan(0);
    });

    it('should have valid portfolio item structure', () => {
      const item = service.portfolio()[0];
      expect(item.symbol).toBeDefined();
      expect(item.quantity).toBeGreaterThan(0);
      expect(item.avgPrice).toBeGreaterThan(0);
      expect(item.currentPrice).toBeGreaterThan(0);
    });
  });

  describe('computed signals', () => {
    it('should compute portfolioValue correctly', () => {
      const value = service.portfolioValue();
      expect(value).toBeGreaterThan(0);

      const manualValue = service.portfolio().reduce(
        (sum, item) => sum + item.quantity * item.currentPrice,
        0
      );
      expect(Math.abs(value - manualValue)).toBeLessThan(0.01);
    });

    it('should compute totalPnl correctly', () => {
      const pnl = service.totalPnl();
      const manualPnl = service.portfolio().reduce(
        (sum, item) => sum + item.quantity * (item.currentPrice - item.avgPrice),
        0
      );
      expect(Math.abs(pnl - manualPnl)).toBeLessThan(0.01);
    });

    it('should compute dashboardStats with valid values', () => {
      const stats = service.dashboardStats();
      expect(stats.totalTrades).toBeGreaterThan(0);
      expect(stats.winRate).toBeGreaterThanOrEqual(0);
      expect(stats.winRate).toBeLessThanOrEqual(100);
      expect(stats.profitFactor).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getEquityCurve', () => {
    it('should return 50 data points', () => {
      const curve = service.getEquityCurve();
      expect(curve.length).toBe(50);
    });

    it('should return positive values', () => {
      const curve = service.getEquityCurve();
      curve.forEach((v) => expect(v).toBeGreaterThan(0));
    });
  });

  describe('getStock', () => {
    it('should return stock by symbol', () => {
      const stock = service.getStock('AAPL');
      expect(stock).toBeTruthy();
      expect(stock?.symbol).toBe('AAPL');
    });

    it('should return undefined for unknown symbol', () => {
      const stock = service.getStock('UNKNOWN');
      expect(stock).toBeUndefined();
    });
  });

  describe('addTrade', () => {
    it('should add a trade to the trades list', () => {
      const initialCount = service.trades().length;
      service.addTrade({
        symbol: 'AAPL',
        type: 'buy',
        quantity: 10,
        price: 190,
        date: new Date(),
        pnl: 100,
      });
      expect(service.trades().length).toBe(initialCount + 1);
    });

    it('should add trade with correct data', () => {
      service.addTrade({
        symbol: 'TSLA',
        type: 'sell',
        quantity: 5,
        price: 250,
        date: new Date(),
      });
      const lastTrade = service.trades()[service.trades().length - 1];
      expect(lastTrade.symbol).toBe('TSLA');
      expect(lastTrade.type).toBe('sell');
      expect(lastTrade.quantity).toBe(5);
    });
  });
});
