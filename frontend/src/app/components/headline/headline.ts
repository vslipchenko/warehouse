import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-headline',
  imports: [Button],
  templateUrl: './headline.html',
  styleUrl: './headline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadlineComponent {
  public readonly addProduct = output<void>();
}
