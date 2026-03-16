import {
  Component,
  input,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HoldingWithPnl } from '../../../../core/models/stock.model';

Chart.register(...registerables);

@Component({
  selector: 'app-allocation-chart',
  standalone: true,
  imports: [DecimalPipe, CurrencyPipe],
  templateUrl: './allocation-chart.component.html',
  styleUrl: './allocation-chart.component.scss',
})
export class AllocationChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('allocationCanvas') allocationCanvas!: ElementRef<HTMLCanvasElement>;

  readonly holdings = input.required<HoldingWithPnl[]>();
  readonly portfolioValue = input.required<number>();

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private renderChart(): void {
    const canvas = this.allocationCanvas?.nativeElement;
    if (!canvas) return;

    const holdings = this.holdings();
    const labels = holdings.map((h) => h.symbol);
    const data = holdings.map((h) => Math.round(h.allocation * 100) / 100);
    const colors = holdings.map((h) => h.color);

    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors.map((c) => c + 'cc'),
            borderColor: colors,
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1d27',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#8b8fa8',
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toFixed(1)}%`,
            },
          },
        },
      },
    });
  }
}
