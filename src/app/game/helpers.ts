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
    return parseFloat(value) || 0;
}

export const compareMassInputsAndDetermineWinner = (leftCardMass: number, rightCardMass: number): string => {
    const isEqualNumber = leftCardMass === rightCardMass;
    const findGreaterNumber = leftCardMass > rightCardMass;
    if (isEqualNumber) {
        return 'Noone';
    } if (findGreaterNumber) {
        return 'Left Card';
    } else {
        return 'Right Card';
    }
}