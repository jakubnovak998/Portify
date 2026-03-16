import { Component } from '@angular/core';
import { HOME_FEATURES } from '../../home.data';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
})
export class FeaturesSectionComponent {
  readonly features = HOME_FEATURES;
}
