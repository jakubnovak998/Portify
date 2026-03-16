import { Component, inject } from '@angular/core';
import { MarketService } from '../../core/services/market.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { AllocationChartComponent } from './components/allocation-chart/allocation-chart.component';
import { HoldingsTableComponent } from './components/holdings-table/holdings-table.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SidebarComponent, PortfolioSummaryComponent, AllocationChartComponent, HoldingsTableComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  private marketService = inject(MarketService);

  readonly portfolioValue = this.marketService.portfolioValue;
  readonly totalPnl = this.marketService.totalPnl;
  readonly totalPnlPercent = this.marketService.totalPnlPercent;
  readonly holdingsWithPnl = this.marketService.holdingsWithPnl;
  readonly bestPerformer = this.marketService.bestPerformer;
  readonly worstPerformer = this.marketService.worstPerformer;
}
