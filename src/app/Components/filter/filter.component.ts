import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  movies: string[] = []; // List of movie titles
  species: string[] = []; // List of species
  selectedMovie: string = '';
  selectedSpecies: string = '';
  minBirthYear: number | null = null;
  maxBirthYear: number | null = null;

  // Example values, replace with actual data from your API
  ngOnInit() {
    this.movies = ['Episode IV: A New Hope', 'Episode V: The Empire Strikes Back', 'Episode VI: Return of the Jedi'];
    this.species = ['Human', 'Droid', 'Wookiee'];
  }

  onFilterChange() {
    this.filterChanged.emit({
      movie: this.selectedMovie,
      species: this.selectedSpecies,
      minBirthYear: this.minBirthYear,
      maxBirthYear: this.maxBirthYear
    });
  }

}
