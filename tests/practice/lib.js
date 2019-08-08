module.exports.absoluteValue = absoluteValue;
module.exports.greeting = greeting;
module.exports.supportedCurrencies = supportedCurrencies;
module.exports.getProduct = getProduct;
module.exports.registerUser = registerUser;
module.exports.fizzBuzz = fizzBuzz;

function absoluteValue(number) {
    return (number >= 0) ? number : -number;
}

function greeting(string) {
    return 'Hello ' + string;
}

function supportedCurrencies () {
    return ['USD', 'EUR', 'BTC'];
}

function getProduct(productId) {
    return { id: productId, price: 10 };
}

function registerUser(username) {
    if(!username) throw new Error('Username is required');
    return { id: new Date().getTime(), username: username }
}

function fizzBuzz(input) {
    if (typeof input !== 'number') throw new Error('Input must be a number');
    if (input % 3 === 0 && input % 5 === 0) return 'FizzBuzz';
    if (input % 3 === 0) return 'Fizz';
    if (input % 5 === 0) return 'Buzz';
    return input;
}