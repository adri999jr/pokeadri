import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DetailsComponent } from './components/details/details.component';


const routes: Routes = [
  { path: '', component: MainComponent }, // Página principal (Lista de Pokémon)
  { path: 'details/:id', component: DetailsComponent}, // Detalles de Pokémon
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
