import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  title = 'warehouse';
}
