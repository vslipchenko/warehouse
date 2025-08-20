import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'warehouse';
}
