import { Winner } from '../models/winner';

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

export const validateInput = (value: string): number | undefined => {
    const parsedValue = parseFloat(value);
    let validatedValue = parsedValue || undefined;
    if (value === 'unknown' || parsedValue === 0) {
        validatedValue = 0;
    }
    return validatedValue;
}

export const compareValuesAndDetermineWinner = (leftCardValue: number | undefined, rightCardValue: number | undefined): string => {
    if (leftCardValue === undefined || rightCardValue === undefined) {
        return '';
    }
    const isEqualNumber = leftCardValue === rightCardValue;
    const isGreaterNumber = leftCardValue > rightCardValue;
    if (isEqualNumber) {
        return Winner.Noone;
    } if (isGreaterNumber) {
        return Winner.LeftCard;
    } else {
        return Winner.RightCard;
    }
}