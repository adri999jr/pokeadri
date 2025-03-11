import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from '../Models/Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

 // Método para obtener los pokemons
getList(offset = 0, limit = 20): Observable<any[]> {
  // Construcción de la URL con los parámetros offset y limit para la paginación
  const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;

  // Imprimir la URL de la petición en la consola
  console.log('Petición => ' + url);

  // Realizar la petición HTTP GET a la URL generada
  return this.http.get<any>(url).pipe(
      // Transformar la respuesta para extraer solo los resultados
      map(response => response.results),
      catchError(this.handleError)
  );
}

// Método para obtener las imágenes de los Pokémon de un array
 // Crear un array de peticiones HTTP GET para cada Pokémon en el array
getPokemonsAtributos(pokemons: any[]): Observable<Pokemon[]> {
  const requests = pokemons.map(pokemon =>
      this.http.get<any>(pokemon.url).pipe(
          // Transformar la respuesta para extraer id, name e image de cada Pokémon
          map(pokemonData => ({
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default
          })),
          // Manejar cualquier error que ocurra durante la petición
          catchError(this.handleError)
      )
  );
  // Ejecutar todas las peticiones  y combinar los resultados
  return forkJoin(requests);
}


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
