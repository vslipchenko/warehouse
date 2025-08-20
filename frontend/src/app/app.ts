import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { TableComponent } from './components/table/table';
import { FooterComponent } from './components/footer/footer';
import { HeadlineComponent } from './components/headline/headline';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    ToolbarComponent,
    TableComponent,
    FooterComponent,
    HeadlineComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
