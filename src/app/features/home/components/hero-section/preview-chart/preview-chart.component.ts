import { Component } from '@angular/core';
import { PREVIEW_CHART_POINTS, ChartPoint } from '../../../home.data';

@Component({
  selector: 'app-preview-chart',
  standalone: true,
  imports: [],
  templateUrl: './preview-chart.component.html',
  styleUrl: './preview-chart.component.scss',
})
export class PreviewChartComponent {
  private readonly points: ChartPoint[] = PREVIEW_CHART_POINTS;

  readonly linePath = this.buildLinePath();
  readonly fillPath = this.buildFillPath();

  private buildLinePath(): string {
    const [first, ...rest] = this.points;
    return `M${first.x},${first.y} ` + rest.map(p => `L${p.x},${p.y}`).join(' ');
  }

  private buildFillPath(): string {
    const last = this.points[this.points.length - 1];
    const first = this.points[0];
    return `${this.linePath} L${last.x},80 L${first.x},80 Z`;
  }
}
