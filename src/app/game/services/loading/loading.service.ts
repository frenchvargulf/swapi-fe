import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$ = new BehaviorSubject(true);

  constructor() { }

  getIsLoading() {
    return this.isLoading$;
  }

  setIsLoadingValue(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
