function repeat(operation, num) {
  
  if (num <= 0){
  	return
  }    
  
  operation();
  
  return repeat(operation, --num)
}

function repeatIterative(operation, num){
	for(num; num >0; num--){
		operation();
	}
}