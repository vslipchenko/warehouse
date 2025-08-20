import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app';
import { config } from './app/config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, config).catch((error) =>
  console.error(error)
);
