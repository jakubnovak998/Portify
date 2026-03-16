import { Component, input } from '@angular/core';

@Component({
  selector: 'app-preview-stat',
  standalone: true,
  imports: [],
  templateUrl: './preview-stat.component.html',
  styleUrl: './preview-stat.component.scss',
})
export class PreviewStatComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly change = input<string | undefined>(undefined);
}
