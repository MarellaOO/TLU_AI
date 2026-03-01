import { Component, Input } from '@angular/core';
import type { FrontPageItem } from '../models/api.models';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <a [href]="item.canonicalUrl" target="_blank" rel="noopener" class="card">
      <div class="card__img-wrap">
        <img
          [src]="imageUrl"
          [alt]="item.heading"
          class="card__img"
          loading="lazy"
        />
      </div>
      <span class="card__title">{{ item.heading }}</span>
    </a>
  `,
  styles: [`
    .card {
      display: flex;
      flex-direction: column;
      width: var(--card-width);
      flex-shrink: 0;
      text-decoration: none;
      color: inherit;
      border-radius: var(--jupiter-radius);
      overflow: hidden;
      background: var(--jupiter-card);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .card:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }
    .card__img-wrap {
      aspect-ratio: 2/3;
      background: var(--jupiter-surface);
      overflow: hidden;
    }
    .card__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .card__title {
      padding: 0.5rem 0.5rem 0.75rem;
      font-size: 0.9rem;
      font-weight: 500;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
})
export class CardComponent {
  @Input({ required: true }) item!: FrontPageItem;

  get imageUrl(): string {
    const photos = this.item.verticalPhotos;
    if (!photos?.length) return '';
    const photo = photos[0];
    const types = photo?.photoTypes;
    if (types?.['60']?.url) return types['60'].url;
    if (types?.['80']?.url) return types['80'].url;
    return photo.photoUrlBase || '';
  }
}
