// 06_Functional 

var doubler = function(n) {
  return n * 2;
};

var map = function (array, iteratorFunc) {
  var returnArray = []
  for (var i = 0; i < array.length; i++) {
    returnArray.push(iteratorFunc(array[i]));
  }
  return returnArray;
};

var filter = function(array, filterFunc) {
  var returnArray = [];

  for (var i = 0; i < array.length; i++) {
    if (filterFunc(array[i])) {
      returnArray.push(array[i]);
    }
  }
  return returnArray;
};

var contains = function(collection, searchVal) {
  for (key in collection) {
    if (collection.hasOwnProperty(key)) {
      if (collection[key] === searchVal) {
        return true;
      }
    }
  }
  return false;
};

var countWords = function(sentence) {
  return sentence.split(" ").length;
};

var countWordsInReduce = function (currentVal, sentence) {
  return currentVal + countWords(sentence);
};


// REDUCE:
// CombinerFunc(startVal, nextVal);


var reduce = function (array, startVal, combinerFunc) {
  var currentVal = startVal;
  for (var i = 0; i < array.length; i++) {
    currentVal = combinerFunc(currentVal, array[i]);
  }
  return currentVal;
};

/* Recursive solution, not required but just FYI */
/* STEPS:
	 - What items change each pass of the Loop in Reduce?
	 	- currentVal, nextVal
	 - When the Array.length is 0 (nothing in the array);
	   - return the startVal;
	 - Find the next startVal
	 - Call Reduce;
	 \
*/

var reduce_recursive = function (array, startVal, combinerFunc) {
  // BASE CASE
  if (array.length === 0) {
    return startVal;
  }
  var nextStartVal = combinerFunc(startVal, array.shift());
  return reduce_recursive(array, nextStartVal, combinerFunc);
};


var sum = function (array) {
  var adder = function(currentSum, nextVal) {
    return currentSum + nextVal;
  };

  return reduce(array, 0, adder);
};

// var every = function(array, checkerFunc) {
//   var everyIterator = function (currentVal, nextVal) {
//     return currentVal && checkerFunc(nextVal);
//   };

//   return reduce(array, true, everyIterator);
// };

// var any = function(array, checkerFunc) {
//   var anyIterator = function (currentVal, nextVal) {
//     return currentVal || checkerFunc(nextVal);
//   };
//   return reduce(array, false, anyIterator);
// };

var every = function(ary, func){
  for (i in ary){
    if(func(ary[i])===false){
      return false;
    }
  }
  return true;
};

var any = function(ary, func){
  for (i in ary){
    if(func(ary[i])===true){
      return true;
    }
  }
  return false;
};
