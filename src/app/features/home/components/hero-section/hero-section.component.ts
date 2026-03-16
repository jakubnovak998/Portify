import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { PreviewChartComponent } from './preview-chart/preview-chart.component';
import { StockRowComponent } from './stock-row/stock-row.component';
import { PreviewStatComponent } from './preview-stat/preview-stat.component';
import { PREVIEW_STOCKS, PREVIEW_STATS, Stat } from '../../home.data';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, SvgIconComponent, PreviewChartComponent, StockRowComponent, PreviewStatComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly stats = input.required<Stat[]>();
  readonly previewStats = PREVIEW_STATS;
  readonly stocks = PREVIEW_STOCKS;
}
