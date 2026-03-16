import {
  Component,
  inject,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketService } from '../../../../core/services/market.service';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { Chart, registerables } from 'chart.js';
import { buildEquityChartConfig } from './equity-chart.config';

Chart.register(...registerables);

@Component({
  selector: 'app-equity-chart',
  standalone: true,
  imports: [SvgIconComponent, DecimalPipe],
  templateUrl: './equity-chart.component.html',
  styleUrl: './equity-chart.component.scss',
})
export class EquityChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('equityCanvas') equityCanvas!: ElementRef<HTMLCanvasElement>;

  private marketService = inject(MarketService);
  private chart: Chart | null = null;

  readonly equityData = this.marketService.getEquityCurve();
  readonly allTimePercent = this.marketService.equityCurveAllTimePercent;

  ngAfterViewInit(): void {
    const canvas = this.equityCanvas?.nativeElement;
    if (!canvas) return;

    const labels = this.equityData.map((_, i) => `Day ${i + 1}`);
    this.chart = new Chart(canvas, buildEquityChartConfig(labels, this.equityData));
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
