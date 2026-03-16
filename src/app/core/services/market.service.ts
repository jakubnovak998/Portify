import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { DashboardStats, HoldingWithPnl, PortfolioItem, Stock, Trade } from '../models/stock.model';

function generateEquityCurve(): number[] {
  const points: number[] = [];
  let value = 10000;
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.42) * 400;
    value = Math.max(8000, value + change);
    points.push(Math.round(value * 100) / 100);
  }
  return points;
}

const EQUITY_CURVE = generateEquityCurve();

@Injectable({ providedIn: 'root' })
export class MarketService {
  private readonly http = inject(HttpClient);

  private _stocks = signal<Stock[]>([]);
  readonly stocks = this._stocks.asReadonly();

  private _portfolio = signal<PortfolioItem[]>([]);
  readonly portfolio = this._portfolio.asReadonly();

  private _trades = signal<Trade[]>([]);
  readonly trades = this._trades.asReadonly();

  constructor() {
    this.http.get<Stock[]>('assets/data/mock-stocks.json').subscribe((data) => {
      this._stocks.set(data);
    });

    this.http.get<PortfolioItem[]>('assets/data/mock-portfolio.json').subscribe((data) => {
      this._portfolio.set(data);
    });

    this.http.get<Trade[]>('assets/data/mock-trades.json').subscribe((data) => {
      this._trades.set(data.map((t) => ({ ...t, date: new Date(t.date as unknown as string) })));
    });
  }

  readonly portfolioValue = computed(() =>
    this._portfolio().reduce((sum, item) => sum + item.quantity * item.currentPrice, 0),
  );

  readonly totalPnl = computed(() =>
    this._portfolio().reduce(
      (sum, item) => sum + item.quantity * (item.currentPrice - item.avgPrice),
      0,
    ),
  );

  readonly dashboardStats = computed<DashboardStats>(() => {
    const trades = this._trades();
    const winning = trades.filter((t) => (t.pnl ?? 0) > 0);
    const losing = trades.filter((t) => (t.pnl ?? 0) < 0);
    const avgWin = winning.length
      ? winning.reduce((s, t) => s + (t.pnl ?? 0), 0) / winning.length
      : 0;
    const avgLoss = losing.length
      ? Math.abs(losing.reduce((s, t) => s + (t.pnl ?? 0), 0) / losing.length)
      : 0;
    const totalWins = winning.reduce((s, t) => s + (t.pnl ?? 0), 0);
    const totalLosses = Math.abs(losing.reduce((s, t) => s + (t.pnl ?? 0), 0));

    return {
      totalTrades: trades.length,
      winRate: trades.length ? (winning.length / trades.length) * 100 : 0,
      profitFactor: totalLosses > 0 ? totalWins / totalLosses : 0,
      avgWin,
      avgLoss,
      totalEquity: this.portfolioValue(),
    };
  });

  readonly holdingsWithPnl = computed<HoldingWithPnl[]>(() =>
    this._portfolio().map((item) => {
      const marketValue = item.quantity * item.currentPrice;
      const costBasis = item.quantity * item.avgPrice;
      const pnl = marketValue - costBasis;
      const pnlPercent = (pnl / costBasis) * 100;
      const allocation = (marketValue / this.portfolioValue()) * 100;
      return { ...item, marketValue, costBasis, pnl, pnlPercent, allocation };
    }),
  );

  readonly totalPnlPercent = computed(() => {
    const totalCost = this._portfolio().reduce(
      (sum, item) => sum + item.quantity * item.avgPrice,
      0,
    );
    return totalCost > 0 ? (this.totalPnl() / totalCost) * 100 : 0;
  });

  readonly bestPerformer = computed(() => {
    const sorted = [...this.holdingsWithPnl()].sort((a, b) => b.pnlPercent - a.pnlPercent);
    return { symbol: sorted[0]?.symbol ?? null, pct: sorted[0]?.pnlPercent ?? 0 };
  });

  readonly worstPerformer = computed(() => {
    const sorted = [...this.holdingsWithPnl()].sort((a, b) => a.pnlPercent - b.pnlPercent);
    return { symbol: sorted[0]?.symbol ?? null, pct: sorted[0]?.pnlPercent ?? 0 };
  });

  readonly equityCurveAllTimePercent = computed(() => {
    const data = EQUITY_CURVE;
    return data.length >= 2 ? ((data[data.length - 1] - data[0]) / data[0]) * 100 : 0;
  });

  getEquityCurve(): number[] {
    return EQUITY_CURVE;
  }

  addTrade(trade: Trade): void {
    this._trades.update((trades) => [...trades, trade]);
  }

  getStock(symbol: string): Stock | undefined {
    return this._stocks().find((s) => s.symbol === symbol);
  }
}
