import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { PersonProperties } from '../../models/person';
import { SwapiPersonResponse } from '../../models/swapi-person-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createPersonPropertiesMock } from '../../models/person.mock';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  API_URL = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getRandomPerson(randomId: number): Observable<PersonProperties> {
    return this.http.get<SwapiPersonResponse>(`${this.API_URL}/people/${randomId}`).pipe(
      map(res => res.result.properties),
      catchError(() => {
        this._snackBar.open('Failed to get a Person! Play again !', 'Close');
        return of(createPersonPropertiesMock({ mass: undefined }))
      })
    );
  }
}
