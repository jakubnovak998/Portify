import { Component, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HoldingWithPnl } from '../../../../core/models/stock.model';

@Component({
  selector: 'app-holdings-table',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './holdings-table.component.html',
  styleUrl: './holdings-table.component.scss',
})
export class HoldingsTableComponent {
  readonly holdings = input.required<HoldingWithPnl[]>();
  readonly portfolioValue = input.required<number>();
  readonly totalPnl = input.required<number>();
  readonly totalPnlPercent = input.required<number>();

  getPnlClass(pnl: number): string {
    return pnl >= 0 ? 'positive' : 'negative';
  }
}
