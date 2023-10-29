import { PersonProperties } from "./person";

export interface StarshipProperties {
    model: string,
    starship_class: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    crew: string,
    passengers: string,
    max_atmosphering_speed: string,
    hyperdrive_rating: string,
    MGLT: string,
    cargo_capacity: string,
    consumables: string,
    pilots: string[],
    created: string,
    edited: string,
    name: string,
    url: string
}

export function createStarshipProperties(): StarshipProperties {
    return {
        model: "",
        starship_class: "",
        manufacturer: "",
        cost_in_credits: "",
        length: "",
        crew: "",
        passengers: "",
        max_atmosphering_speed: "",
        hyperdrive_rating: "",
        MGLT: "",
        cargo_capacity: "",
        consumables: "",
        pilots: [
        ],
        created: "",
        edited: "",
        name: "",
        url: ""
    }
}

export function isStarship(properties: StarshipProperties | PersonProperties): properties is StarshipProperties {
    return 'crew' in properties;
}

