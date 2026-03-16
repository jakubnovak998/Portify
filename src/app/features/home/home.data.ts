export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface StockRow {
  symbol: string;
  price: string;
  change: string;
}

export const HOME_STATS: Stat[] = [
  { value: '$2.4B+', label: 'Assets Managed' },
  { value: '50K+', label: 'Active Traders' },
  { value: '99.9%', label: 'Uptime' },
  { value: '0.01%', label: 'Commission' },
];

export const HOME_FEATURES: Feature[] = [
  {
    icon: '📈',
    title: 'Real-Time Analytics',
    description: 'Track your portfolio performance with live charts and detailed analytics dashboards.',
  },
  {
    icon: '🛡️',
    title: 'Risk Management',
    description: 'Monitor win rates, profit factors, and key metrics to manage trading risk effectively.',
  },
  {
    icon: '💼',
    title: 'Portfolio Tracking',
    description: 'Comprehensive portfolio overview with P&L tracking, allocation charts, and holdings.',
  },
  {
    icon: '⚡',
    title: 'Quick Execution',
    description: 'Execute trades instantly with our streamlined quick-trade form and order management.',
  },
  {
    icon: '📊',
    title: 'Advanced Charts',
    description: 'Beautiful equity curve charts and technical analysis tools powered by Chart.js.',
  },
  {
    icon: '🔒',
    title: 'Secure Platform',
    description: 'Bank-level security with encrypted data and two-factor authentication support.',
  },
];

export interface ChartPoint {
  x: number;
  y: number;
}

export const PREVIEW_CHART_POINTS: ChartPoint[] = [
  { x: 0, y: 70 }, { x: 30, y: 55 }, { x: 60, y: 60 }, { x: 90, y: 40 },
  { x: 120, y: 45 }, { x: 150, y: 30 }, { x: 180, y: 25 }, { x: 210, y: 20 },
  { x: 240, y: 15 }, { x: 270, y: 10 }, { x: 300, y: 5 },
];

export interface PreviewStat {
  label: string;
  value: string;
  change?: string;
}

export const PREVIEW_STATS: PreviewStat[] = [
  { label: 'Total Value', value: '$84,250.40', change: '+12.4%' },
  { label: 'Win Rate', value: '68.5%' },
];

export const PREVIEW_STOCKS: StockRow[] = [
  { symbol: 'AAPL', price: '$189.25', change: '+1.25%' },
  { symbol: 'NVDA', price: '$875.40', change: '+2.64%' },
  { symbol: 'TSLA', price: '$242.80', change: '-2.07%' },
];
