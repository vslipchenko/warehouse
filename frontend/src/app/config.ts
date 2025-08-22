import {ApplicationConfig} from '@angular/core';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import auraTheme from '@primeuix/themes/aura';
import {createHttpLink, InMemoryCache} from '@apollo/client/core';
import {provideApollo} from 'apollo-angular';
import {environment} from '../environments/environment';

export const config: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: auraTheme,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideApollo(() => ({
      link: createHttpLink({
        uri: environment.graphqlUri,
      }),
      cache: new InMemoryCache(),
    })),
  ],
};
