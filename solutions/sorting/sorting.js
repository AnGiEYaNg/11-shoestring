function bubbleSort(arr) {

    if (!arr.length) return arr;

    var swap = function (i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    var swapsPerformedOnLastRunThrough;
    var i;
    var l = arr.length;

    while (swapsPerformedOnLastRunThrough !== 0) {

        swapsPerformedOnLastRunThrough = 0;

        for (i = 0; i < l - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(i, i + 1);
                swapsPerformedOnLastRunThrough++;
            }
        }

    }

    return arr;

}

function merge(left, right) {

    var merged = [];

    while (left.length || right.length) {

        if (!left.length) {

            return merged.concat(right);

        } else if (!right.length) {

            return merged.concat(left);

        } else {

            if (left[0] < right[0]) {
                merged.push(left.shift());
            } else {
                merged.push(right.shift());
            }

        }



    }

    return merged;

}

function split(arr) {

    if (!arr.length) return [];
    if (arr.length === 1) return [arr, []];

    var halfwayIndex = Math.floor(arr.length / 2);

    return [arr.slice(0, halfwayIndex), arr.slice(halfwayIndex)];

}

function mergeSort(arr) {

    if (arr.length <= 1) return arr;

    var arrHalved = split(arr);
    var left = arrHalved[0];
    var right = arrHalved[1];

    left = mergeSort(left);
    right = mergeSort(right);

    return merge(left, right);

}