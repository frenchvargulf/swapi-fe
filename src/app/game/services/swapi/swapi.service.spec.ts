import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameComponent } from '../../game.component';
import { PersonProperties } from '../../models/person';
import { createPersonPropertiesMock } from '../../models/person.mock';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SwapiService', () => {
  let swapiService: SwapiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
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

  it('should handle error and open snackbar', async () => {
    const randomId = 1;

    const mockError = new Error('Mock HTTP error');
    const mockResponse = {
      error: mockError,
    };

    spyOn(swapiService['_snackBar'], 'open');

    swapiService.getRandomPerson(randomId).subscribe(
      () => {
        expect(swapiService['_snackBar'].open).toHaveBeenCalledWith('Failed to get a Person! Play again !', 'Close')
      });

    const req = httpTestingController.expectOne(`${swapiService.API_URL}/people/${randomId}`);
    req.flush(mockResponse, { status: 404, statusText: 'Not Found' });
  });
});
