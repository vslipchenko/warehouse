import {DestroyRef, inject} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

export const untilDestroyed = () => {
  const destroyed$ = new Subject<void>();

  inject(DestroyRef).onDestroy((): void => {
    destroyed$.next();
    destroyed$.complete();
  });

  return <T>() => takeUntil<T>(destroyed$.asObservable());
};
