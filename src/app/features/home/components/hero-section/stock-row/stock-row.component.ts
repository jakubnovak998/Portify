import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-stock-row',
  standalone: true,
  imports: [],
  templateUrl: './stock-row.component.html',
  styleUrl: './stock-row.component.scss',
})
export class StockRowComponent {
  readonly symbol = input.required<string>();
  readonly price = input.required<string>();
  readonly change = input.required<string>();
  readonly positive = computed(() => !this.change().startsWith('-'));
}
