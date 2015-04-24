// depth-first, passing down parameter (arrays are passed by reference!)
var traverseDomAndCollectElements = function(matchFunc, startEl, resultSet) {
  // short-circuiting logical OR operator for "default" assignment
  resultSet = resultSet || [];
  if (typeof startEl === "undefined") startEl = document.body;

  if (matchFunc(startEl)) resultSet.push(startEl);

  for (var i = 0; i < startEl.children.length; i++) {
    // these calls return resultSet, but we don't care — the important thing
    // is that each function call is modifying the SAME resultSet
    traverseDomAndCollectElements(matchFunc, startEl.children[i], resultSet);
  }
  // when we do return resultSet to our $ engine, we know that it has
  // been modified by all the recursive checks.
  return resultSet;
};

// breadth-first using a queue
var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  // we don't recurse, so we can simply start with document.body
  var queue = [ document.body ],
      node;

  while (queue.length) {
    node = queue.shift();
    if (matchFunc(node)) resultSet.push(node);
    for (var i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  return resultSet;
};

// ******Original solution from review.********
var traverseDomAndCollectElements = function (matchFunc, startEl) {

    var resultSet = [];
    var children;

    if (typeof startEl === "undefined") {
        startEl = document.body;
    }

    if (matchFunc(startEl)) {
        resultSet.push(startEl);
    }

    if (startEl.children.length !== 0) {

        children = [].slice.call(startEl.children);

        children.forEach(function (childElement) {
            resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, childElement));
        });

    }

    // your code here
    // traverse the DOM tree and collect matching elements in resultSet
    // use matchFunc to identify matching elements

    return resultSet;

};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function (selector) {

    // #header
    // .friend
    // div
    // div.friend

    var firstChar = selector[0];

    if (firstChar === '#') return 'id';
    if (firstChar === '.') return 'class';

    if (selector.indexOf('.') !== -1) {
        return 'tag.class';
    }

    return 'tag';

};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function (selector) {

    // #header
    // .friend
    // div
    // div.friend

    var selectorType = selectorTypeMatcher(selector);
    var matchFunction;

    if (selectorType === "id") {
        // define matchFunction for id
        matchFunction = function (el) {
            return el.id === selector.slice(1);
        };

    } else if (selectorType === "class") {

        matchFunction = function (el) {
            var className = selector.slice(1);
            return el.classList.contains(className);
        };

    } else if (selectorType === "tag.class") {
        // define matchFunction for tag.class
        matchFunction = function (el) {
            var parts = selector.split('.');
            return el.tagName.toLowerCase() === parts[0].toLowerCase()
                   && el.classList.contains(parts[1]);
        };

    } else if (selectorType === "tag") {
        // define matchFunction for tag
        matchFunction = function (el) {
            return el.tagName && el.tagName.toLowerCase() === selector.toLowerCase();
        };
    }

    return matchFunction;

};

var $ = function (selector) {
    var elements;
    var selectorMatchFunc = matchFunctionMaker(selector);
    elements = traverseDomAndCollectElements(selectorMatchFunc);
    return elements;
};