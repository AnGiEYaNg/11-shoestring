var func = function (x) {
    return function (y) {
        console.log('x is', x);
        console.log('y is', y);
    };
};

var func2 = func(6);

func2(7);

