import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinCounterService {
  leftCardPlayerWins = new BehaviorSubject(0);
  rightCardPlayerWins = new BehaviorSubject(0);

  constructor() { }

  getLeftCardPlayerWins() {
    return this.leftCardPlayerWins;
  }

  increaseLeftCardPlayerWins() {
    const increatedValue = this.leftCardPlayerWins.getValue() + 1;
    this.leftCardPlayerWins.next(increatedValue);
  }

  getRightCardPlayerWins() {
    return this.rightCardPlayerWins;
  }

  increaseRightCardPlayerWins() {
    const increatedValue = this.rightCardPlayerWins.getValue() + 1;
    this.rightCardPlayerWins.next(increatedValue);
  }
}
