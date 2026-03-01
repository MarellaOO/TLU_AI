import { Component } from '@angular/core';
import { ContentAreaComponent } from './content-area/content-area.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContentAreaComponent],
  template: `<app-content-area />`,
  styles: [`:host { display: block; min-height: 100vh; }`],
})
export class AppComponent {}
