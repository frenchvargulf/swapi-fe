import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameComponent } from '../../game.component';
import { PersonProperties } from '../../models/person';
import { createPersonPropertiesMock } from '../../models/person.mock';

describe('SwapiService', () => {
  let swapiService: SwapiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GameComponent]
    });
    swapiService = TestBed.inject(SwapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(swapiService).toBeTruthy();
  });

  it('should fetch a random person', () => {
    const randomId = 1;
    const mockPerson = createPersonPropertiesMock();

    swapiService.getRandomPerson(randomId).subscribe((person: PersonProperties) => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpTestingController.expectOne(`${swapiService.API_URL}/people/${randomId}`);
    expect(req.request.method).toBe('GET');

    req.flush({ result: { properties: mockPerson } });
  });
});
