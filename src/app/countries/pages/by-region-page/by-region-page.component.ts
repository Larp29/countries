import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa'|'Europe'|'Americas'|'Asia'|'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries : Country[] = [];
  public regions : Region[] = ['Africa','Europe','Americas','Asia','Oceania'];
  public currentRegion ?: Region;

  constructor(private countriesService: CountriesService){}

  searchByRegion(region: Region){
    this.currentRegion = region;
    this.countriesService.searchRegion(region).subscribe( countries => this.countries = countries);
  }

}
