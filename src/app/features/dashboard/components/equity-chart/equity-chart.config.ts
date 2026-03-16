import { ChartConfiguration } from 'chart.js';

export function buildEquityChartConfig(
  labels: string[],
  data: number[],
): ChartConfiguration<'line'> {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Equity',
          data,
          borderColor: '#00d4aa',
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(0, 212, 170, 0.25)');
            gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#00d4aa',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1d27',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#8b8fa8',
          bodyColor: '#00d4aa',
          bodyFont: { size: 14, weight: 'bold' },
          callbacks: {
            label: (ctx) =>
              ` $${(ctx.parsed.y ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8b8fa8', font: { size: 11 }, maxTicksLimit: 8 },
          border: { color: 'rgba(255,255,255,0.06)' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: '#8b8fa8',
            font: { size: 11 },
            callback: (v) => `$${Number(v).toLocaleString()}`,
          },
          border: { color: 'rgba(255,255,255,0.06)' },
        },
      },
      interaction: { mode: 'index', intersect: false },
    },
  };
}
