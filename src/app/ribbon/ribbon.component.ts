import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FrontPageSection } from '../models/api.models';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-ribbon',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section class="ribbon">
      @if (section.header) {
        <h2 class="ribbon__title">{{ section.header }}</h2>
      }
      <div class="ribbon__scroll" #scrollContainer>
        <div class="ribbon__track">
          @for (item of section.data; track item.id) {
            <app-card [item]="item" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ribbon {
      margin-bottom: 2rem;
    }
    .ribbon__title {
      margin: 0 0 0.75rem 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--jupiter-text);
    }
    .ribbon__scroll {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: var(--jupiter-text-muted) transparent;
    }
    .ribbon__scroll::-webkit-scrollbar {
      height: 6px;
    }
    .ribbon__scroll::-webkit-scrollbar-track { background: transparent; }
    .ribbon__scroll::-webkit-scrollbar-thumb {
      background: var(--jupiter-text-muted);
      border-radius: 3px;
    }
    .ribbon__track {
      display: flex;
      gap: 0.75rem;
      padding: 0 1rem;
      width: max-content;
    }
  `],
})
export class RibbonComponent {
  @Input({ required: true }) section!: FrontPageSection;
}
