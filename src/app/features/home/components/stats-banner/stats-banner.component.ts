import { Component, input } from '@angular/core';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats-banner',
  standalone: true,
  imports: [],
  templateUrl: './stats-banner.component.html',
  styleUrl: './stats-banner.component.scss',
})
export class StatsBannerComponent {
  readonly stats = input.required<Stat[]>();
}
