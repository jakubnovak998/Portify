export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  color: string;
}

export interface Trade {
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: Date;
  pnl?: number;
}

export interface DashboardStats {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
  totalEquity: number;
}

export interface HoldingWithPnl extends PortfolioItem {
  marketValue: number;
  costBasis: number;
  pnl: number;
  pnlPercent: number;
  allocation: number;
}
