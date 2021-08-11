import { getRandomNumber } from "./random-number.js";

    describe("random number", () => {
        test("random number should be between 0 and 13", () => {
        const randomNumber = getRandomNumber(14);
        expect(randomNumber >= 0 && randomNumber <= 13).toBe(true);
         })
        test("random number should be between 0 and one less than the input number", () => {
        const randomNumber = getRandomNumber(1);
        expect(randomNumber === 0).toBe(true);
        })
    })