import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pokemonDetails: any; // Donde se almacenan los detalles del Pokémon

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Obtén el ID del Pokémon desde la URL
    const pokemonId = this.route.snapshot.params['id'];

    // Usa el servicio para obtener los detalles del Pokémon
    this.pokemonService.getPokemonDetails(pokemonId).subscribe(
      details => {
        this.pokemonDetails = details; // Almacena los detalles recibidos
      },
      error => {
        console.error('Error al obtener los detalles del Pokémon:', error);
      }
    );
  }
}
