import { Component, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, SvgIconComponent],
  templateUrl: './portfolio-summary.component.html',
  styleUrl: './portfolio-summary.component.scss',
})
export class PortfolioSummaryComponent {
  readonly portfolioValue = input.required<number>();
  readonly totalPnl = input.required<number>();
  readonly totalPnlPercent = input.required<number>();
  readonly holdingsCount = input.required<number>();
  readonly bestPerformerSymbol = input<string | null>(null);
  readonly bestPerformerPct = input.required<number>();
  readonly worstPerformerSymbol = input<string | null>(null);
  readonly worstPerformerPct = input.required<number>();

  getPnlClass(pnl: number): string {
    return pnl >= 0 ? 'positive' : 'negative';
  }
}