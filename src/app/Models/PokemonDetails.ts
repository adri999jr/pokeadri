export class PokemonDetails {
    name: string; 
    url: string; // URL del recurso del Pokémon
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

  
    constructor(name: string, url: string, height: number, weight: number, abilities: { ability: { name: string; } }[], types: { type: { name: string; } }[], stats: { base_stat: number; stat: { name: string; } }[]) {
      this.name = name; 
      this.url = url;
      this.height = height;
      this.weight = weight;
      this.abilities = abilities;
      this.types = types;
      this.stats = stats; 
   
    }
  
    
  }