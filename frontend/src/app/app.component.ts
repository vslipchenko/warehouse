import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toolbar} from "primeng/toolbar";
import {Button} from "primeng/button";
import {Avatar} from "primeng/avatar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'warehouse';
}
