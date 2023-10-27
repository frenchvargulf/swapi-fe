import { PersonProperties } from "./person"

export interface SwapiPersonResponse {
    result: {
        properties: PersonProperties
    }
}