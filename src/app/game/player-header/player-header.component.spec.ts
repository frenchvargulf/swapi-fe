import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerHeaderComponent } from './player-header.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

describe('PlayerHeaderComponent', () => {
  let component: PlayerHeaderComponent;
  let fixture: ComponentFixture<PlayerHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerHeaderComponent]
    });
    fixture = TestBed.createComponent(PlayerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display player name', () => {
    component.player = 'Player 1';
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.title');
    expect(titleElement.textContent).toContain('Player 1');
  });

  it('should display win count using async pipe', () => {
    const winCountSubject = new BehaviorSubject<number>(5);
    component.winCount$ = winCountSubject;
    fixture.detectChanges();
    const winCountElement = fixture.nativeElement.querySelector('.win-count');

    expect(winCountElement.textContent).toContain('Wins: 5');

    winCountSubject.next(8);
    fixture.detectChanges();
    expect(winCountElement.textContent).toContain('Wins: 8');
  });
});
