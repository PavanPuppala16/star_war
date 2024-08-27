import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwapiService } from 'src/app/Services/swapi.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {


  characters: any[] = [];
  filteredCharacters: any[] = [];
  Pagenation:any;
  count:any;
  selectedMovie:any[]=[];
  selectedstarship:any[]=[];
  selectedvehicles:any[]=[];
  selectedspecies:any[]=[];
  movies:any[]=[];
  vehicles:any[]=[];
  starships:any[]=[];
  species:any=[];
  birthyear:any;
  birthyear1:any;
  next: string | null = null;
  previous: string | null = null;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  constructor(private swapiService: SwapiService,private http: HttpClient) { }

  ngOnInit(): void {
    
    this.swapiService.getPeople().subscribe(data => {
      this.characters = data.results;
      this.Pagenation=data.next;
      this.count = data.count;
      this.totalPages = Math.ceil(this.count / this.pageSize);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.filteredCharacters = this.characters; // Initialize with all characters
      if( this.filteredCharacters.length>0){
        this.filteredCharacters.forEach((item:any,index: number) => {
           if(item.species.length>0){
            const speciesUrl = item.species[0]; // Assuming you want to get the first species in the array
            this.swapiService.fetchSpeciesName(speciesUrl).subscribe((resp: any) => {
                item.speciesName = resp.name;
            });
           }else{
            item.speciesName='';
           }
        });
      }
      
    


     // this.loadinfo(this.filteredCharacters);
    });
    this.getPeople(this.currentPage);
    this.GetFilterInfo()
  }
  getPeople(page: number): void {
    const url = `https://swapi.dev/api/people/?page=${page}`;
    this.http.get<any>(url).subscribe(data => {
    //  this.people = data.results;
      this.characters = data.results;
      this.next = data.next;
      this.previous = data.previous;
      this.count=data.count;
      this.filteredCharacters = this.characters; 
      if( this.filteredCharacters.length>0){
        this.filteredCharacters.forEach((item:any,index: number) => {
           if(item.species.length>0){
            const speciesUrl = item.species[0]; // Assuming you want to get the first species in the array
            this.swapiService.fetchSpeciesName(speciesUrl).subscribe((resp: any) => {
                item.speciesName = resp.name;
            });
           }else{
            item.speciesName='';
           }
        });
      }// Initialize with all characters
      this.loadinfo(this.filteredCharacters);
    });
  }
  
  GetFilterInfo(){
    this.swapiService.getMovies().subscribe(data => {
      this.movies = data.results;
    });
    this.swapiService.getSpecies().subscribe(data => {
      this.species = data.results;
    });
    this.swapiService.getStarships().subscribe(data => {
      this.starships = data.results;
      console.log(this.starships);
    });
    this.swapiService.getStarships().subscribe(data => {
      this.starships = data.results;
    });
    this.swapiService.getVehicles().subscribe(data => {
      this.vehicles = data.results;
    });
  }
  getmovies(){
    this.swapiService.getMovies().subscribe(data => {
      this.movies = data.results;
    });
  }
  getSpecies(){
    this.swapiService.getSpecies().subscribe(data => {
      this.species = data.results;
    });
  }
  getVehicles(){
    this.swapiService.getVehicles().subscribe(data => {
      this.vehicles = data.results;
    });
  }
  getStarships(){
    this.swapiService.getStarships().subscribe(data => {
      this.starships = data.results;
    });
  }
  
  loadinfo(filteredCharacters:any){
    
  //  this.movies=filteredCharacters[0].films;
  //  this.starships=filteredCharacters[0].starships;
  //  this.vehicles=filteredCharacters[0].vehicles;
  //  this.species=filteredCharacters[0].species;
   
  }
  filterMovie(){
    this.filteredCharacters = this.characters.filter(character => {
      let matches = true;
      // Filter by selected movie
      if (this.selectedMovie && !character.films.includes(this.selectedMovie)) {
        matches = false;
      }
      return matches;
    });
  }
  filterspecies(){
    this.filteredCharacters = this.characters.filter(character => {
      let matches = true;
      // Filter by selected species
      if (this.selectedspecies && !character.species.includes(this.selectedspecies)) {
        matches = false;
      }
      return matches;
    });
  }
  filtervehicles(){
    this.filteredCharacters = this.characters.filter(character => {
      let matches = true;
      // Filter by selected vehicle
      if (this.selectedvehicles && !character.vehicles.includes(this.selectedvehicles)) {
        matches = false;
      }
      return matches;
    });
  }
  filterstarship(){
    this.filteredCharacters = this.characters.filter(character => {
      let matches = true;
         // Filter by selected starship
      if (this.selectedstarship && !character.starships.includes(this.selectedstarship)) {
        matches = false;
      }
  
      return matches;
    });
  }
  filterBirth(){
    this.filteredCharacters = this.characters.filter(character => {
      let matches = true;
         // Filter by selected starship
      if (this.birthyear && !character.birth_year.includes(this.birthyear)) {
        matches = false;
      }
  
      return matches;
    });
  }
  filterCharacters() {
    this.filteredCharacters = this.characters.filter(character => {
      let matches = true;
  
      // Filter by selected movie
      if (this.selectedMovie && !character.films.includes(this.selectedMovie)) {
        matches = false;
      }
  
      // Filter by selected species
      if (this.selectedspecies && !character.species.includes(this.selectedspecies)) {
        matches = false;
      }
  
      // Filter by selected vehicle
      if (this.selectedvehicles && !character.vehicles.includes(this.selectedvehicles)) {
        matches = false;
      }
  
      // Filter by selected starship
      if (this.selectedstarship && !character.starships.includes(this.selectedstarship)) {
        matches = false;
      }
  
      return matches;
    });
  }
  
  onSearch(): void {
    this.filterCharacters();
  }
  startpage(){
    console.log(this.Pagenation);
  }
  goToPage(page: number): void {
    this.currentPage = page;
    this.getPeople(this.currentPage);
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPeople(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPeople(this.currentPage);
    }
  }
}
