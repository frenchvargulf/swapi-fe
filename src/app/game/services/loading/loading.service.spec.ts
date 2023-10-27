import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should initialize isLoading$ to true', (done) => {
    loadingService.isLoading$.subscribe((isLoading: boolean) => {
      expect(isLoading).toBe(true);
      done();
    });
  });

  it('should set isLoading$ value to false', (done) => {
    loadingService.setIsLoadingValue(false);

    loadingService.isLoading$.subscribe((isLoading: boolean) => {
      expect(isLoading).toBe(false);
      done();
    });
  });

  it('should get the current isLoading$ value', (done) => {
    loadingService.setIsLoadingValue(true);

    loadingService.getIsLoading().subscribe((isLoading: boolean) => {
      expect(isLoading).toBe(true);
      done();
    });
  });
});
