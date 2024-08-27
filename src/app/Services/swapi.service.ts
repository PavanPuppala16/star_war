import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private baseUrl = 'https://swapi.dev/api';
  constructor(private http: HttpClient) { }

  getPeople(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/people/`);
  }
 
  getPerson(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/people/${id}/`);
  }
  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/films/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/species/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vehicles/`);
  }

  getStarships(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/starships/`);
  }
  fetchSpeciesName(url:string):Observable<any>{
    return this.http.get<any>(`${url}`);
  }
}
