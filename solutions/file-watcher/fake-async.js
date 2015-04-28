//var nums = [1, 2, 3, 4, 5];
//
//var transformedArrayOfNumbers = nums.map(function (num) {
//    return num * 2;
//});

var glorp = {};

glorp.map = function (originalArray, iterator, finalCallback) {

    var iterationsCompleted = 0;
    var transformedArray = [];
    var lengthOfOriginalArray = originalArray.length;

    originalArray.forEach(function (element, index) {

        iterator(element, function (err, transformedValue) {

            if (err) {
                return finalCallback(err);
            }

            transformedArray[index] = transformedValue;
            iterationsCompleted++;

            if (iterationsCompleted === lengthOfOriginalArray) {
                finalCallback(null, transformedArray);
            }

        });

    });

};

module.exports = glorp;