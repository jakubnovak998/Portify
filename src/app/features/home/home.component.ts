import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { StatsBannerComponent } from './components/stats-banner/stats-banner.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HOME_STATS } from './home.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    StatsBannerComponent,
    FeaturesSectionComponent,
    CtaSectionComponent,
    HomeFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly stats = HOME_STATS;
}
