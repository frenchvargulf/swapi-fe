import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { PersonProperties } from '../../models/person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createPersonPropertiesMock } from '../../models/person.mock';
import { SwapiResponse } from '../../models/swapi-response';
import { StarshipProperties } from '../../models/starships';
import { createStarshipPropertiesMock } from '../../models/starship-mock';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  API_URL = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private loadingService: LoadingService) { }

  getRandomPerson(randomId: number): Observable<PersonProperties> {
    return this.http.get<SwapiResponse>(`${this.API_URL}/people/${randomId}`).pipe(
      map(res => res.result.properties as PersonProperties),
      catchError(() => {
        this._snackBar.open('Failed to get a Person! Play again !', 'Close');
        this.loadingService.setIsLoadingValue(false);
        return of(createPersonPropertiesMock({ mass: undefined }))
      })
    );
  }

  getRandomStarship(randomId: number): Observable<StarshipProperties> {
    return this.http.get<SwapiResponse>(`${this.API_URL}/starships/${randomId}`).pipe(
      map(res => res.result.properties as StarshipProperties),
      catchError(() => {
        this._snackBar.open('Failed to get a Starship! Play again !', 'Close');
        this.loadingService.setIsLoadingValue(false);
        return of(createStarshipPropertiesMock({ crew: undefined }))
      })
    );
  }
}
