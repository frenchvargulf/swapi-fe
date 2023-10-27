import { PersonProperties, createPersonProperties } from "./person";

const personMock = createPersonProperties();

export function createPersonPropertiesMock(override?: Partial<PersonProperties>): PersonProperties {
    return {
        ...personMock,
        ...override
    };
}
