import { StarshipProperties } from "./starships";

export interface PersonProperties {
    birth_year: string, 
    eye_color: string, 
    films: string[],
    gender: string,
    hair_color: string,
    height: string,
    homeworld: string,
    mass: string,
    name: string,
    skin_color: string,
    created: string,
    edited: string,
    species: string[],
    starships: string[],
    url: string[],
    vehicles: string[]
}

export function createPersonProperties(): PersonProperties {
    return {
        birth_year: '', 
        eye_color: '', 
        films: [],
        gender: '',
        hair_color: '',
        height: '',
        homeworld: '',
        mass: '',
        name: '',
        skin_color: '',
        created: '',
        edited: '',
        species: [],
        starships: [],
        url: [],
        vehicles: []
      }
}

export function isPerson(properties: StarshipProperties | PersonProperties): properties is PersonProperties {
    return 'mass' in properties;
}
