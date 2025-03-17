import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { PokemonDetails } from '../../Models/PokemonDetails';


@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pokemon: PokemonDetails | undefined; // Variable para almacenar la información del Pokémon
  img: string = ''; // Variable para la URL de la imagen del Pokémon
  shiny: string = ''; // Variable para la URL del GIF animado del Pokémon

  constructor(
    private route: ActivatedRoute, // Inyecta el servicio ActivatedRoute para trabajar con rutas
    private pokemonService: PokemonService // Inyecta el servicio de Pokémon para obtener datos
  ) { }

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente
    this.route.params.subscribe(params => {
      // Se suscribe a los parámetros de la ruta activa
      const id = +params['id']; // Obtiene el parámetro 'id' de la ruta y lo convierte a número
      if (id) {
        // Si hay un ID válido
        this.pokemonService.getPokemonById(id).subscribe(pokemon => {
          // Llama al servicio para obtener los datos del Pokémon por ID
          console.log('Pokemon data:', pokemon); // Imprime los datos del Pokémon en la consola (para debug)
          this.pokemon = pokemon; // Asigna los datos del Pokémon a la variable
          // Asigna las URL de la imagen y el shiny animado del Pokémon usando el ID
          this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
          this.shiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${id}.gif`;
        });
      }
    });
  }

}
