import { PersonProperties } from "./person"
import { StarshipProperties } from "./starships"

export interface SwapiResponse {
    result: {
        properties: PersonProperties | StarshipProperties
    }
}