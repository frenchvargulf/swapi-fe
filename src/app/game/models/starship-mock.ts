import { createStarshipProperties, StarshipProperties } from "./starships";

const starshipMock = createStarshipProperties();

export function createStarshipPropertiesMock(override?: Partial<StarshipProperties>): StarshipProperties {
    return {
        ...starshipMock,
        ...override
    };
}
