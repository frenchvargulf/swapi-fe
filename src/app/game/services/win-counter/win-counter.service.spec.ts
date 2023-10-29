import { TestBed } from '@angular/core/testing';

import { WinCounterService } from './win-counter.service';

describe('WinCounterService', () => {
  let service: WinCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize leftCardPlayerWins and rightCardPlayerWins to 0', () => {
    expect(service.leftCardPlayerWins.getValue()).toBe(0);
    expect(service.rightCardPlayerWins.getValue()).toBe(0);
  });

  it('should increase leftCardPlayerWins', () => {
    service.increaseLeftCardPlayerWins();
    expect(service.leftCardPlayerWins.getValue()).toBe(1);
  });

  it('should increase rightCardPlayerWins', () => {
    service.increaseRightCardPlayerWins();
    expect(service.rightCardPlayerWins.getValue()).toBe(1);
  });

  it('should return leftCardPlayerWins as an Observable', () => {
    service.getLeftCardPlayerWins().subscribe(value => {
      expect(value).toBe(0);
    });
  });

  it('should return rightCardPlayerWins as an Observable', () => {
    service.getRightCardPlayerWins().subscribe(value => {
      expect(value).toBe(0);
    });
  });
});
