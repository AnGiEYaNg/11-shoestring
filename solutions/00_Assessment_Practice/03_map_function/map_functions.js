function tripleAllIterative(numbers) {
  var result = []
  for (var i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 3)
  }
  return result
}

function tripleAll(numbers){
	return numbers.map(function(num){
		return num*3;
	});
}