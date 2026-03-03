import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JupiterApiService } from '../services/jupiter-api.service';
import type { FrontPageSection } from '../models/api.models';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { BannerComponent } from '../banner/banner.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-content-area',
  standalone: true,
  imports: [CommonModule, RibbonComponent, BannerComponent],
  template: `
    <main class="content-area">
      @if (loading) {
        <div class="loading">Laen…</div>
      }
      @if (error) {
        <div class="error">{{ error }}</div>
      }
      @if (banner) {
        <app-banner [section]="banner" />
      }
      @for (section of ribbons; track section.header + $index) {
        <app-ribbon [section]="section" />
      }
    </main>
  `,
  styles: [`
    .content-area {
      padding: 1.5rem 0 3rem;
      min-height: 100vh;
    }
    .loading, .error {
      text-align: center;
      padding: 3rem;
      color: var(--jupiter-text-muted);
    }
    .error { color: var(--jupiter-accent); }
  `],
})
export class ContentAreaComponent {
  ribbons: FrontPageSection[] = [];
  banner: FrontPageSection | null = null;
  loading = true;
  error: string | null = null;

  constructor(private api: JupiterApiService) {
    forkJoin({
      banner: this.api.getFrontPageBanner(),
      ribbons: this.api.getFrontPageRibbons(),
    }).subscribe({
      next: ({ banner, ribbons }) => {
        this.banner = banner;
        this.ribbons = ribbons;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message ?? 'Andmete laadimine ebaõnnestus';
        this.loading = false;
      },
    });
  }
}
