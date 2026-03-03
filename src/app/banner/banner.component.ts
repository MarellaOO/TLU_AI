import { Component, Input } from '@angular/core';
import type { FrontPageSection, FrontPageItem } from '../models/api.models';

@Component({
  selector: 'app-banner',
  standalone: true,
  template: `
    @if (firstItem; as item) {
      <a
        class="banner"
        [href]="getSafeUrl(item.canonicalUrl)"
        target="_blank"
        rel="noopener noreferrer"
        (click)="openInNewTab($event, item.canonicalUrl)"
      >
        <div class="banner__img-wrap">
          <img
            [src]="getBannerImageUrl(item)"
            [alt]="item.heading"
            class="banner__img"
            loading="eager"
          />
        </div>
        <div class="banner__caption">
          <span class="banner__title">{{ item.heading }}</span>
        </div>
      </a>
    }
  `,
  styles: [`
    .banner {
      display: block;
      position: relative;
      margin: 0 1rem 1.5rem;
      border-radius: var(--jupiter-radius);
      overflow: hidden;
      background: var(--jupiter-surface);
      text-decoration: none;
      color: inherit;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .banner:hover {
      transform: scale(1.01);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    }
    .banner__img-wrap {
      aspect-ratio: 16/9;
      max-height: 42vh;
      overflow: hidden;
    }
    .banner__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .banner__caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem 1rem 1rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.85));
    }
    .banner__title {
      font-size: 1.5rem;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0,0,0,0.8);
    }
  `],
})
export class BannerComponent {
  @Input({ required: true }) section!: FrontPageSection | null;

  /** Esimene bänneri sisu (API võib anda mitu banner: true, võtame esimese). */
  get firstItem(): FrontPageItem | null {
    if (!this.section?.data?.length) return null;
    return this.section.data[0] ?? null;
  }

  getSafeUrl(url: string): string {
    if (!url || (!url.startsWith('https://') && !url.startsWith('http://'))) return '#';
    return url;
  }

  openInNewTab(event: MouseEvent, url: string): void {
    if (!url || url === '#' || event.ctrlKey || event.metaKey || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getBannerImageUrl(item: FrontPageItem): string {
    const photos = item.photos;
    if (!photos?.length) {
      const vert = item.verticalPhotos?.[0];
      if (vert?.photoTypes?.['2']?.url) return vert.photoTypes['2'].url;
      if (vert?.photoUrlBase) return vert.photoUrlBase;
      return '';
    }
    const photo = photos[0];
    const types = photo?.photoTypes;
    if (types?.['2']?.url) return types['2'].url;
    if (types?.['17']?.url) return types['17'].url;
    return photo?.photoUrlBase ?? '';
  }
}
