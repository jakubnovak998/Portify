import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatVolume', standalone: true })
export class FormatVolumePipe implements PipeTransform {
  transform(vol: number): string {
    if (vol >= 1_000_000) return `${(vol / 1_000_000).toFixed(1)}M`;
    if (vol >= 1_000) return `${(vol / 1_000).toFixed(0)}K`;
    return String(vol);
  }
}
