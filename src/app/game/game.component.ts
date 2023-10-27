import { Component, OnInit } from '@angular/core';
import { SwapiService } from './services/swapi/swapi.service';
import { Observable, forkJoin } from 'rxjs';
import { compareMassInputsAndDetermineWinner, getUniqueRandomIds, validatePersonMassInput } from './helpers';
import { LoadingService } from './services/loading/loading.service';
import { createPersonProperties } from './models/person';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  leftCard = createPersonProperties();
  rightCard = createPersonProperties();
  winner: string | undefined;
  isLoading$: Observable<boolean>;

  constructor(private swapiService: SwapiService, private loadingService: LoadingService) {
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

    forkJoin([firstRequest, secondRequest]).subscribe(results => {
      this.leftCard = results[0];
      this.rightCard = results[1];
      this.loadingService.setIsLoadingValue(false);
      this.determineWinner();
    });
  }

  determineWinner() {
    this.winner = compareMassInputsAndDetermineWinner(validatePersonMassInput(this.leftCard.mass), validatePersonMassInput(this.rightCard.mass));
  }

  playAgain() {
    this.playGame();
    this.winner = undefined;
  }
}