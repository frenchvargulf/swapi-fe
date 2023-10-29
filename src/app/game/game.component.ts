import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SwapiService } from './services/swapi/swapi.service';
import { Observable, Subject, forkJoin, takeUntil } from 'rxjs';
import { compareValuesAndDetermineWinner, getUniqueRandomIds, validateInput } from './helpers/helpers';
import { LoadingService } from './services/loading/loading.service';
import { PersonProperties, createPersonProperties, isPerson } from './models/person';
import { WinCounterService } from './services/win-counter/win-counter.service';
import { Winner } from './models/winner';
import { GameMode } from './models/game-mode.mock';
import { StarshipProperties, isStarship } from './models/starships';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
  mode = GameMode.People;
  leftCard: PersonProperties | StarshipProperties = createPersonProperties();
  rightCard: PersonProperties | StarshipProperties = createPersonProperties();
  winner: string | undefined = undefined;
  isLoading$: Observable<boolean>;
  private destroy$ = new Subject<void>();
  leftCardPlayersWinCount$ = this.winCounterService.getLeftCardPlayerWins();
  rightCardPlayersWinCount$ = this.winCounterService.getRightCardPlayerWins();
  propertyName = GameMode.People === this.mode ? 'Mass is' : 'Crew is';
  leftCardPropertyValueToDisplay = this.determinePropertyToDisplay(this.leftCard);
  rightCardPropertyValueToDisplay = this.determinePropertyToDisplay(this.rightCard);

  constructor(private swapiService: SwapiService, private loadingService: LoadingService, private winCounterService: WinCounterService) {
    this.isLoading$ = this.loadingService.getIsLoading();
  }

  ngOnInit() {
    this.playGame();
  }

  changeMode() {
    this.mode = this.mode === GameMode.People ? GameMode.Starships : GameMode.People;
    this.propertyName = GameMode.People === this.mode ? 'Mass is' : 'Crew is';
    this.playAgain();
  }

  determinePropertyToDisplay(cardToCheck: PersonProperties | StarshipProperties) {
    if (isPerson(cardToCheck)) {
      return cardToCheck.mass;
    } else {
      return cardToCheck.crew;
    }
  }

  playGame() {
    this.loadingService.setIsLoadingValue(true);
    const uniqueRandomIds = getUniqueRandomIds(1, this.mode === GameMode.People ? 82 : 36);

    const getEntity = (id: number) =>
      this.mode === GameMode.People
        ? this.swapiService.getRandomPerson(id)
        : this.swapiService.getRandomStarship(id);

    forkJoin([getEntity(uniqueRandomIds[0]), getEntity(uniqueRandomIds[1])])
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.leftCard = results[0];
        this.rightCard = results[1];
        this.leftCardPropertyValueToDisplay = this.determinePropertyToDisplay(this.leftCard);
        this.rightCardPropertyValueToDisplay = this.determinePropertyToDisplay(this.rightCard);
        this.loadingService.setIsLoadingValue(false);
        this.determineWinner();
      });
  }

  determineWinner(): void {
    let leftCardValue, rightCardValue;
    if (isPerson(this.leftCard) && isPerson(this.rightCard)) {
      leftCardValue = validateInput(this.leftCard.mass);
      rightCardValue = validateInput(this.rightCard.mass);
    } else if (isStarship(this.leftCard) && isStarship(this.rightCard)) {
      leftCardValue = validateInput(this.leftCard.crew),
      rightCardValue = validateInput(this.rightCard.crew);
    }

    this.winner = compareValuesAndDetermineWinner(leftCardValue, rightCardValue);

    if (this.winner === Winner.LeftCard) {
      this.winCounterService.increaseLeftCardPlayerWins();
    } else if (this.winner === Winner.RightCard) {
      this.winCounterService.increaseRightCardPlayerWins();
    }
  }

  playAgain() {
    this.leftCardPropertyValueToDisplay = '';
    this.rightCardPropertyValueToDisplay = '';
    this.winner = undefined;
    this.playGame();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}