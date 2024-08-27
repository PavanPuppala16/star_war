import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './Components/character-list/character-list.component';
import { CharacterDetailComponent } from './Components/character-detail/character-detail.component';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
