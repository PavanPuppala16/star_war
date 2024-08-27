import { Component } from '@angular/core';
import { SwapiService } from 'src/app/Services/swapi.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent {
  character: any;

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }
  movies:any[]=[];
  species:any[]=[];
  starships:any[]=[];
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.swapiService.getPerson(id).subscribe(data => {
      this.character = data;
      this.movies=[];
      this.species=[];
      this.starships=[];
      if( this.character!=undefined){
        if(this.character.films.length>0){
          this.character.films.forEach((item:any,index: number) => {
             const filmsUrl = item; // Assuming you want to get the first species in the array
             this.swapiService.fetchSpeciesName(filmsUrl).subscribe((resp: any) => {
                 this.movies.push(resp.title) ;
             });
         });
        }
        if(this.character.species.length>0){
          this.character.species.forEach((item:any,index: number) => {
             const speciesUrl = item; // Assuming you want to get the first species in the array
             this.swapiService.fetchSpeciesName(speciesUrl).subscribe((resp: any) => {
                 this.species.push(resp.name) ;
             });
         });
        }
         if(this.character.starships.length>0){
          this.character.starships.forEach((item:any,index: number) => {
             const starshipsUrl = item; // Assuming you want to get the first species in the array
             this.swapiService.fetchSpeciesName(starshipsUrl).subscribe((resp: any) => {
                 this.starships.push(resp.name) ;
             });
         });
        }
      }
    });

  }
}
