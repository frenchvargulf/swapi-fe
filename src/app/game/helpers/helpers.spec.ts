import { compareValuesAndDetermineWinner, getRandomNumber, getUniqueRandomIds, validateInput } from "./helpers";


describe('Helper Functions', () => {
    describe('getRandomNumber', () => {
        it('should return a random number within the specified range', () => {
            const min = 1;
            const max = 10;
            const randomNumber = getRandomNumber(min, max);
            expect(randomNumber).toBeGreaterThanOrEqual(min);
            expect(randomNumber).toBeLessThanOrEqual(max);
        });
    });

    describe('getUniqueRandomIds', () => {
        it('should return an array of two unique random IDs within the specified range', () => {
            const min = 1;
            const max = 10;
            const uniqueIds = getUniqueRandomIds(min, max);
            expect(uniqueIds.length).toBe(2);
            expect(uniqueIds[0]).not.toBe(uniqueIds[1]);
            expect(uniqueIds[0]).toBeGreaterThanOrEqual(min);
            expect(uniqueIds[0]).toBeLessThanOrEqual(max);
            expect(uniqueIds[1]).toBeGreaterThanOrEqual(min);
            expect(uniqueIds[1]).toBeLessThanOrEqual(max);
        });

        it('should throw an error if the range is too small', () => {
            const min = 1;
            const max = 1;
            expect(() => getUniqueRandomIds(min, max)).toThrowError('The range is too small to generate two unique numbers.');
        });
    });

    describe('validateInput', () => {
        it('should parse a valid number input', () => {
            const validInput = '50.5';
            const parsedValue = validateInput(validInput);
            expect(parsedValue).toBe(50.5);
        });

        it('should return 0 for unknwon input', () => {
            const invalidInput = 'unknown';
            const parsedValue = validateInput(invalidInput);
            expect(parsedValue).toBe(0);
        });

        it('should return undefined for undefined input', () => {
            const invalidInput = 'undefined';
            const parsedValue = validateInput(invalidInput);
            expect(parsedValue).toBe(undefined);
        });
    });

    describe('compareValuesAndDetermineWinner', () => {
        it('should determine "Noone" as the winner for equal masses', () => {
            const leftMass = 60;
            const rightMass = 60;
            const winner = compareValuesAndDetermineWinner(leftMass, rightMass);
            expect(winner).toBe('Noone');
        });

        it('should determine "Left Card" as the winner for greater left mass', () => {
            const leftMass = 70;
            const rightMass = 60;
            const winner = compareValuesAndDetermineWinner(leftMass, rightMass);
            expect(winner).toBe('Left Card');
        });

        it('should determine "Right Card" as the winner for greater right mass', () => {
            const leftMass = 60;
            const rightMass = 70;
            const winner = compareValuesAndDetermineWinner(leftMass, rightMass);
            expect(winner).toBe('Right Card');
        });
    });
});