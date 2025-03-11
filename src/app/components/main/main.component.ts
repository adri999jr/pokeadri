import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { Pokemon } from '../../Models/Pokemon';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pokemons: Pokemon[] = [];
  currentPage = 0; // Página actual
  saltoPagina= 20; // salta 20 pokemosn
  private isShinyMode: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(page = this.currentPage): void {
    const offset = page * this.saltoPagina; // Calcula el desplazamiento basado en la página actual es decir cuantos pokemons se salta
    this.pokemonService.getList(offset).subscribe(
      (data: any[]) => {
        this.pokemonService.getPokemonsAtributos(data).subscribe(
          (pokemons: Pokemon[]) => {
            this.pokemons = pokemons;
            this.pokemons.sort((a, b) => a.id - b.id); // Ordena por ID
          },
          error => {
            console.error('There was an error!', error);
          }
        );
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  // Método para avanzar a la siguiente página
  nextPage(): void {
    this.currentPage++;
    /*if(this.shiny){
      this.getPokemonsShiny(this.currentPage);
    }*/
    this.getPokemons(this.currentPage);
  }

  // Método para retroceder a la página anterior
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
     /* if(this.shiny){
        this.getPokemonsShiny(this.currentPage);
      }*/
      this.getPokemons(this.currentPage);
    }
  }

  getPokemonsShiny(page= this.currentPage): void {
    const offset = page * this.saltoPagina; // Calcula el desplazamiento basado en la página actual es decir cuantos pokemons se salta
    this.pokemonService.getList(offset).subscribe(
      (data: any[]) => {
        this.pokemonService.getShiny(data).subscribe(
          (pokemons: Pokemon[]) => {
            this.pokemons = pokemons;
            this.pokemons.sort((a, b) => a.id - b.id); // Ordena por ID
          },
          error => {
            console.error('There was an error!', error);
          }
        );
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  toggleFunction() {
    if (this.isShinyMode) {
      this.getPokemons();
    } else {
      this.getPokemonsShiny();
    }
    this.isShinyMode = !this.isShinyMode;
  }
}







