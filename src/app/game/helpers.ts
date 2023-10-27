export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getUniqueRandomIds = (min: number, max: number) => {
    if (max - min + 1 < 2) {
        throw new Error("The range is too small to generate two unique numbers.");
    }

    const uniqueNumbers: Set<number> = new Set();

    while (uniqueNumbers.size < 2) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
}

export const validatePersonMassInput = (value: string): number => {
    return parseInt(value) || 0;
}
