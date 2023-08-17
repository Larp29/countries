import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStorage } from '../interfaces/cache-storage.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStorage: CacheStorage = {
      byCapital :   { term: '', countries: []},
      byCountries : { term: '', countries: []},
      byRegion :    { region: '', countries: []},
    }

    constructor(private http: HttpClient){
      this.restoreLocalStorage();
    }

    private storeLocalStorage(){
      localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStorage));
    }

    private restoreLocalStorage(){
      if(!localStorage.getItem('cacheStorage')) return;
      this.cacheStorage = JSON.parse(localStorage.getItem('cacheStorage')!);
    }

    private getCountriesRequest(url: string):Observable<Country[]>{
        return this.http.get<Country[]>(url).pipe(
            catchError(()=> of([])),
        );
    }

    searchCountryByAlphaCode( code : string): Observable<Country | null>{
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url).pipe(
            map( countries => countries.length > 0 ? countries[0] : null),
            catchError( () => of(null) )
        );
    }

    searchCapital(term: string): Observable <Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url).pipe(
          tap( countries => {
            this.cacheStorage.byCapital = {term, countries}
          }),
          tap(()=> this.storeLocalStorage())
        );
    }

    searchCountry(country : string): Observable<Country[]>{
        const url = `${this.apiUrl}/name/${country}`;
        return this.getCountriesRequest(url).pipe(
          tap( countries => {
            this.cacheStorage.byCountries = {term:country, countries}
          }),
          tap(()=> this.storeLocalStorage())
        );
    }

    searchRegion(region: Region): Observable<Country[]>{
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountriesRequest(url).pipe(
          tap( countries => {
            this.cacheStorage.byRegion = {region, countries}
          }),
          tap(()=> this.storeLocalStorage())
        );
    }

}
