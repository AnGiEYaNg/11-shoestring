/* REPEAT SOLUTION */

function repeat(str, multi){
	var finalString = "";
	for(multi; multi > 0; multi--){
		finalString += str;
	}	
	return finalString;
}


/* SUM SOLUTION */

function sum(inputArr){
	var total = 0;
	for(var i =0; i < inputArr.length; i++){
		total += inputArr[i]
	}
	return total;
}


/* GRID GENERATOR SOLUTION */

function gridGenerator(size){
	var board = "";
	// i is the lines
	for(var i = 0; i < size; i++){
		// j is the characters
		for(var j =0; j < size; j++){
			if((i+j) % 2 === 0){
				board += "#";
			} else {
				board += " ";
			}
		}
	board += "\n";
	}
	return board;
}



/* LARGESTRIPLET SOLUTION */

function largestTriplet(num){
	var a;
	for(var c = num; c > 0; c--){
		for(var b = c-1; b > 0; b--){
			a = Math.sqrt((c*c) - (b*b));
			// tests if it is a whole number, integer (non fraction/decimal)
			if(a % 1 === 0){
				return [a,b,c];
			}
		}
	}
}

/* LARGESTTRIPLET SOLUTION */ 

// function largestTriplet(num){
//   for(var c=num; c>0;c--){
//     for(var b=c-1;b>0;b--){
//         // checks all values of b
// 			for(var a=c-1;a>0;a--){
// 			    // checks all values of a
// 			    //  a*a + b*b
// 				if (Math.pow(a,2)+Math.pow(b,2)===Math.pow(c,2)){
// 				    return [a,b,c];
// 				}
// 			}
// 		}
//  	}
// }



/* JOIN SOLUTION */


function join(inputArr, delimiter){
	var finalString = "";
	for(var i = 0; i < inputArr.length; i++){
		finalString += inputArr[i];
		if(typeof delimiter === "undefined"){
			delimiter = "";
		}
		if(i !== inputArr.length - 1){
			finalString += delimiter
		}
	}
	return finalString;
}

/* PARAMIFY SOLUTION */

function paramify(obj){
	var params = [];
	for(var prop in obj){
		if(Object.hasOwnProperty.call(obj, prop)){
			params.push(prop + "=" + obj[prop]);	
		}		
	}
	params.sort();
	// used the join function created earlier
	return join(params,"&");
}

