import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { SwapiService } from './services/swapi/swapi.service';
import { LoadingService } from './services/loading/loading.service';
import { of } from 'rxjs';
import { createPersonPropertiesMock } from './models/person.mock';
import { PlayerHeaderComponent } from './player-header/player-header.component';
import { WinCounterService } from './services/win-counter/win-counter.service';
import { PersonProperties, isPerson } from './models/person';
import { PropertiesCardComponent } from './properties-card/properties-card.component';
import { GameMode } from './models/game-mode.mock';
import { isStarship } from './models/starships';
import { createStarshipPropertiesMock } from './models/starship-mock';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let swapiService: jasmine.SpyObj<SwapiService>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let winCounterService: jasmine.SpyObj<WinCounterService>;

  beforeEach(() => {
    const swapiServiceSpy = jasmine.createSpyObj('SwapiService', ['getRandomPerson', 'getRandomStarship']);
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setIsLoadingValue', 'getIsLoading']);
    const winCounterServiceSpy = jasmine.createSpyObj('WinCounterService', ['increaseLeftCardPlayerWins', 'increaseRightCardPlayerWins', 'getLeftCardPlayerWins', 'getRightCardPlayerWins']);

    TestBed.configureTestingModule({
      imports: [PropertiesCardComponent],
      declarations: [GameComponent, PlayerHeaderComponent],
      providers: [
        { provide: SwapiService, useValue: swapiServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: WinCounterService, useValue: winCounterServiceSpy }
      ],
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService) as jasmine.SpyObj<SwapiService>;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    winCounterService = TestBed.inject(WinCounterService) as jasmine.SpyObj<WinCounterService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call playGame on initialization', () => {
    const getRandomPersonResponse = createPersonPropertiesMock({ id: '1', mass: '82' } as Partial<PersonProperties>);
    swapiService.getRandomPerson.and.returnValue(of(getRandomPersonResponse));

    component.ngOnInit();

    expect(loadingService.setIsLoadingValue).toHaveBeenCalledWith(true);
    expect(swapiService.getRandomPerson).toHaveBeenCalledTimes(2);
    expect(component.winner).not.toEqual('');
    expect(component.leftCardPropertyValueToDisplay).toBe('82');
    expect(component.rightCardPropertyValueToDisplay).toBe('82');
  });

  it('should reset the game when playAgain is called', () => {
    const getRandomPersonResponse = createPersonPropertiesMock();
    swapiService.getRandomPerson.and.returnValue(of(getRandomPersonResponse));

    component.playAgain();

    expect(swapiService.getRandomPerson).toHaveBeenCalledTimes(2);
    expect(component.leftCard).toEqual(getRandomPersonResponse);
    expect(component.rightCard).toEqual(getRandomPersonResponse);
    expect(component.winner).toEqual('');
  });

  it('should determine the winner as Left Card if leftCard mass is greater', () => {
    if (isPerson(component.leftCard) && isPerson(component.rightCard)) {
      component.leftCard.mass = '100';
      component.rightCard.mass = '50';

      component.determineWinner();

      expect(component.winner).toBe('Left Card');
      expect(winCounterService.increaseLeftCardPlayerWins).toHaveBeenCalled();
    }
  });

  it('should determine the winner as Left Card if leftCard crew is greater', () => {
    if (isStarship(component.leftCard) && isStarship(component.rightCard)) {
      component.leftCard.crew = '10000';
      component.rightCard.crew = '1';

      component.determineWinner();

      expect(component.winner).toBe('Left Card');
      expect(winCounterService.increaseLeftCardPlayerWins).toHaveBeenCalled();
    }
  });

  it('should determine the winner as Right Card if rightCard mass is greater', () => {
    if (isPerson(component.leftCard) && isPerson(component.rightCard)) {
      component.leftCard.mass = '50';
      component.rightCard.mass = '100';

      component.determineWinner();

      expect(component.winner).toBe('Right Card');
      expect(winCounterService.increaseRightCardPlayerWins).toHaveBeenCalled();
    }
  });

  it('should determine the winner as Right Card if rightCard crew is greater', () => {
    if (isStarship(component.leftCard) && isStarship(component.rightCard)) {
      component.leftCard.crew = '50';
      component.rightCard.crew = '100';

      component.determineWinner();

      expect(component.winner).toBe('Right Card');
      expect(winCounterService.increaseRightCardPlayerWins).toHaveBeenCalled();
    }
  });

  it('should determine Noone as the winner if masses are equal', () => {
    if (isPerson(component.leftCard) && isPerson(component.rightCard)) {
      component.leftCard.mass = '50';
      component.rightCard.mass = '50';

      component.determineWinner();

      expect(component.winner).toBe('Noone');
    }
  });

  it('should toggle game mode', () => {
    const getRandomStarshipResponse = createStarshipPropertiesMock();
    swapiService.getRandomStarship.and.returnValue(of(getRandomStarshipResponse));

    component.changeMode();
    expect(component.mode).toBe(GameMode.Starships);
    expect(component.propertyName).toBe('Crew is');
  });

  it('should determine winner based on correct property', () => {
    const mockStarship = createStarshipPropertiesMock({ crew: '45' });
    const result = component.determinePropertyToDisplay(mockStarship);
    expect(result).toBe('45');
  })
});