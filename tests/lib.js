module.exports.absoluteValue = function(number) {
    if (number > 0) return number;
    if (number < 0) return -number;
    return 0;
}