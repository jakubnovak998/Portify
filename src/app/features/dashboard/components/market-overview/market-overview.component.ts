import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketService } from '../../../../core/services/market.service';
import { FormatVolumePipe } from '../../../../shared/pipes/format-volume.pipe';

@Component({
  selector: 'app-market-overview',
  standalone: true,
  imports: [DecimalPipe, FormatVolumePipe],
  templateUrl: './market-overview.component.html',
  styleUrl: './market-overview.component.scss',
})
export class MarketOverviewComponent {
  private marketService = inject(MarketService);

  readonly stocks = this.marketService.stocks;

  getChangeClass(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }
}
