import { Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe, NumberSymbol } from '@angular/common';
import { MarketService } from '../../../../core/services/market.service';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, SvgIconComponent],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.scss',
})
export class DashboardStatsComponent {
  private marketService = inject(MarketService);

  readonly stats = this.marketService.dashboardStats;
  readonly portfolioValue = this.marketService.portfolioValue;
  readonly totalPnl = this.marketService.totalPnl;
}
