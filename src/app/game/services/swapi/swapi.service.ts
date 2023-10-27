import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PersonProperties } from '../../models/person';
import { SwapiPersonResponse } from '../../models/swapi-person-response';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  API_URL = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) { }

  getRandomPerson(randomId: number): Observable<PersonProperties> {
    return this.http.get<SwapiPersonResponse>(`${this.API_URL}/people/${randomId}`).pipe(map(res => res.result.properties));
  }
}
