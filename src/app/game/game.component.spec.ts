import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { SwapiService } from './services/swapi/swapi.service';
import { LoadingService } from './services/loading/loading.service';
import { of } from 'rxjs';
import { PersonProperties } from './models/person';
import { PersonPropertiesCardComponent } from './person-properties-card/person-properties-card.component';
import { createPersonPropertiesMock } from './models/person.mock';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let swapiService: jasmine.SpyObj<SwapiService>;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const swapiServiceSpy = jasmine.createSpyObj('SwapiService', ['getRandomPerson']);
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setIsLoadingValue', 'getIsLoading']);

    TestBed.configureTestingModule({
      imports: [PersonPropertiesCardComponent],
      declarations: [GameComponent],
      providers: [
        { provide: SwapiService, useValue: swapiServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService) as jasmine.SpyObj<SwapiService>;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call playGame on initialization', () => {
    const getRandomPersonResponse = createPersonPropertiesMock({id: '1', mass: '70'} as Partial<PersonProperties>);
    swapiService.getRandomPerson.and.returnValue(of(getRandomPersonResponse));

    component.ngOnInit();

    expect(loadingService.setIsLoadingValue).toHaveBeenCalledWith(true);
    expect(swapiService.getRandomPerson).toHaveBeenCalledTimes(2);
    expect(component.winner).not.toEqual('');
    expect(loadingService.setIsLoadingValue).toHaveBeenCalledWith(false);
  });

  it('should reset the game when playAgain is called', () => {
    const getRandomPersonResponse = createPersonPropertiesMock();
    swapiService.getRandomPerson.and.returnValue(of(getRandomPersonResponse));

    component.playAgain();

    expect(swapiService.getRandomPerson).toHaveBeenCalledTimes(2);
    expect(component.leftCard).toEqual(getRandomPersonResponse);
    expect(component.rightCard).toEqual(getRandomPersonResponse);
    expect(component.winner).toEqual(undefined);
  });

  it('should determine the winner as Left Card if leftCard mass is greater', () => {
    component.leftCard.mass = '100';
    component.rightCard.mass = '50';

    component.determineWinner();
  
    expect(component.winner).toBe('Left Card');
  });
  
  it('should determine the winner as Right Card if rightCard mass is greater', () => {
    component.leftCard.mass = '50';
    component.rightCard.mass = '100';
  
    component.determineWinner();
  
    expect(component.winner).toBe('Right Card');
  });
  
  it('should determine Noone as the winner if masses are equal', () => {
    component.leftCard.mass = '50';
    component.rightCard.mass = '50';
  
    component.determineWinner();
  
    expect(component.winner).toBe('Noone');
  });
});