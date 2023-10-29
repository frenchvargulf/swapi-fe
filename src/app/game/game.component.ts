import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SwapiService } from './services/swapi/swapi.service';
import { Observable, Subject, forkJoin, takeUntil } from 'rxjs';
import { compareMassInputsAndDetermineWinner, getUniqueRandomIds, validatePersonMassInput } from './helpers/helpers';
import { LoadingService } from './services/loading/loading.service';
import { createPersonProperties } from './models/person';
import { WinCounterService } from './services/win-counter/win-counter.service';
import { Winner } from './models/winner';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
  leftCard = createPersonProperties();
  rightCard = createPersonProperties();
  winner: string | undefined = undefined;
  isLoading$: Observable<boolean>;
  private destroy$ = new Subject<void>();
  leftCardPlayersWinCount$ = this.winCounterService.getLeftCardPlayerWins();
  rightCardPlayersWinCount$ = this.winCounterService.getRightCardPlayerWins();

  constructor(private swapiService: SwapiService, private loadingService: LoadingService, private winCounterService: WinCounterService) {
    this.isLoading$ = this.loadingService.getIsLoading();
  }

  ngOnInit() {
    this.playGame();
  }

  playGame() {
    this.loadingService.setIsLoadingValue(true);
    const uniqueRandomIds = getUniqueRandomIds(1, 82);
    const firstRequest = this.swapiService.getRandomPerson(uniqueRandomIds[0]);
    const secondRequest = this.swapiService.getRandomPerson(uniqueRandomIds[1]);

    forkJoin([firstRequest, secondRequest]).pipe(takeUntil(this.destroy$)).subscribe(results => {
      this.leftCard = results[0];
      this.rightCard = results[1];
      this.loadingService.setIsLoadingValue(false);
      if (this.leftCard.mass && this.rightCard.mass) {
        this.determineWinner();
      }
    });
  }

  determineWinner() {
    this.winner = compareMassInputsAndDetermineWinner(validatePersonMassInput(this.leftCard.mass), validatePersonMassInput(this.rightCard.mass));

    if (this.winner === Winner.LeftCard) {
      this.winCounterService.increaseLeftCardPlayerWins();
    } else if (this.winner === Winner.RightCard) {
      this.winCounterService.increaseRightCardPlayerWins();
    }
  }

  playAgain() {
    this.playGame();
    this.winner = undefined;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}