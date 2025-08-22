import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [Toolbar],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
