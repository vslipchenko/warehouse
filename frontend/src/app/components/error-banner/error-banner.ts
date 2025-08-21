import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  imports: [],
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBannerComponent {
  public readonly visible = input.required<boolean>();
  public readonly message = input.required<string>();
}
