export class PokemonDetails {
    id: number;
    name: string; 
    url: string; // URL del recurso del Pokémon
    image: string; // URL de la imagen del Pokémon
    abilities: { // Habilidades del Pokémon
      ability: {
        name: string; // Nombre de la habilidad
      };
    }[];
    types: { // Tipos del Pokémon
      type: {
        name: string; // Nombre del tipo
      };
    }[];
    stats: { // Estadísticas del Pokémon
      base_stat: number; // Valor base de la estadística
      stat: {
        name: string; // Nombre de la estadística
      };
    }[];
    height: number; // Altura del Pokémon
    weight: number; // Peso del Pokémon
    //shiny: string; // URL del GIF animado del Pokémon
  
    constructor(name: string, url: string, height: number, weight: number, abilities: { ability: { name: string; } }[], types: { type: { name: string; } }[], stats: { base_stat: number; stat: { name: string; } }[]) {
      this.name = name; 
      this.url = url;
      this.id = this.getIdByUrl(); // Obtiene y asigna el ID del Pokémon a partir de la URL
      this.image = this.getImageUrl(); // Obtiene y asigna la URL de la imagen del Pokémon
      this.height = height;
      this.weight = weight;
      this.abilities = abilities;
      this.types = types;
      this.stats = stats; 
   
    }
  
    private getIdByUrl(): number {
      // Método privado para obtener el ID del Pokémon a partir de la URL
      const urlParts = this.url.split("/"); // Divide la URL en partes usando "/" como separador
      return parseInt(urlParts[urlParts.length - 2], 10); // Convierte el penúltimo segmento de la URL en un número entero y lo retorna
    }
  
    private getImageUrl(): string {
      // Método privado para obtener la URL de la imagen del Pokémon
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`; // Retorna la URL de la imagen del Pokémon
    }
  

    
  }