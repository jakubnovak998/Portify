import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { EquityChartComponent } from './components/equity-chart/equity-chart.component';
import { QuickTradeComponent } from './components/quick-trade/quick-trade.component';
import { MarketOverviewComponent } from './components/market-overview/market-overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, DashboardStatsComponent, EquityChartComponent, QuickTradeComponent, MarketOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;
}
