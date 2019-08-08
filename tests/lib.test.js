const lib = require('./lib');

describe('absoluteValue', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absoluteValue(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absoluteValue(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 if input is 0', () => {
        const result = lib.absoluteValue(0);
        expect(result).toBe(0);
    });
});

describe('greeting', () => {
    it('should return a greeting containing input string', () => {
        const result = lib.greeting('paz');
        expect(result).toContain('paz');
    });
});

describe('supportedCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.supportedCurrencies();
        expect(result).toEqual(expect.arrayContaining(['BTC', 'USD', 'EUR']));
    });
});

describe('getProduct', () => {
    it('should return given product', () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({ id: 1, price: 10 });
    });
});

describe('registerUser', () => {
    // this violates 'single assertion principle'
    it('should throw if username is falsy', () => { 
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(arg => {
            expect(() => { lib.registerUser(arg) }).toThrow();
        });
    });

    it('should return a user object if valid username passed', () => {
        const result = lib.registerUser('Matt');
        expect(result).toMatchObject({ username: 'Matt' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('fizzBuzz', () => {
    it('should throw if input is not number', () => {
        expect(() => { lib.fizzBuzz('hello') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow();
    });

    it('should return FizzBuzz if input is multiple of both 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is multiple of 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is multiple of 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return input if input is not multiple of 3 nor 5', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1);
    });
});