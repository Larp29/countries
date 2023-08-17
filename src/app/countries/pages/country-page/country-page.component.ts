import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;
  public srcMaps?: SafeResourceUrl;
  public currentTime = new Date();

  private _key: string = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
  private _baseUrlMaps: string = 'https://www.google.com/maps/embed/v1/place?q=';
  private _latlng?: number[];
  

  constructor( 
    private activatedRouted: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private countriesService: CountriesService ){}
  
  ngOnInit(): void {
    this.activatedRouted.params
      .pipe(
        switchMap( params => this.countriesService.searchCountryByAlphaCode( params['id'] )),
      )
      .subscribe(
        country => {
          if(!country) return this.router.navigateByUrl('');
          this._latlng = country.latlng;
          this.srcMaps = this.sanitizer.bypassSecurityTrustResourceUrl(`${this._baseUrlMaps}${country.name.common}&key=${this._key}&center=${this._latlng}&zoom=5`);
          return this.country = country;
        }
      );
  }

  // getCurrentTime(): Date{
  //   setInterval(()=>{
  //     return new Date();
  //   },1000);
  //   return new Date();
  // }
}
