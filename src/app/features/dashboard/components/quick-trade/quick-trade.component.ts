import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MarketService } from '../../../../core/services/market.service';

@Component({
  selector: 'app-quick-trade',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './quick-trade.component.html',
  styleUrl: './quick-trade.component.scss',
})
export class QuickTradeComponent {
  private fb = inject(FormBuilder);
  private marketService = inject(MarketService);

  tradeForm = this.fb.group({
    symbol: ['AAPL', Validators.required],
    type: ['buy', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  readonly symbols = ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'GOOGL', 'NVDA', 'META', 'JPM'];
  readonly tradeSuccess = signal('');

  readonly currentPrice = computed(() => {
    const sym = this.tradeForm.get('symbol')?.value;
    return this.marketService.getStock(sym ?? 'AAPL')?.price ?? 0;
  });

  readonly estimatedTotal = computed(() => {
    const qty = this.tradeForm.get('quantity')?.value ?? 1;
    return this.currentPrice() * (qty as number);
  });

  submitTrade(): void {
    if (this.tradeForm.invalid) return;

    const { symbol, type, quantity } = this.tradeForm.value;
    const stock = this.marketService.getStock(symbol!);

    if (!stock) return;

    this.marketService.addTrade({
      symbol: symbol!,
      type: type as 'buy' | 'sell',
      quantity: quantity as number,
      price: stock.price,
      date: new Date(),
    });

    this.tradeSuccess.set(`${type === 'buy' ? 'Bought' : 'Sold'} ${quantity} ${symbol} @ $${stock.price.toFixed(2)}`);
    setTimeout(() => this.tradeSuccess.set(''), 3000);
    this.tradeForm.patchValue({ quantity: 1 });
  }
}
