import { Component, inject, input, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const cache = new Map<string, string>();

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  template: `<span [innerHTML]="svgContent()"></span>`,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; }
    :host ::ng-deep svg { width: 1em; height: 1em; }
  `],
})
export class SvgIconComponent {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  name = input.required<string>();
  svgContent = signal<SafeHtml>('');

  constructor() {
    effect(() => {
      const n = this.name();
      if (cache.has(n)) {
        this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(cache.get(n)!));
        return;
      }
      this.http.get(`/icons/${n}.svg`, { responseType: 'text' }).subscribe((svg) => {
        cache.set(n, svg);
        this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(svg));
      });
    });
  }
}
