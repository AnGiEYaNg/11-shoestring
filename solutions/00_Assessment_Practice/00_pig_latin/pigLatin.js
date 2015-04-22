function translate(phrase){
	var phraseArray = phrase.split(" ");
	return phraseArray.map(function(word){
		return makePigLatin(word);
	}).join(" ");
}

function makePigLatin(word){
	var i = 0;

	while(!isVowel(word[i])){
		i++
	}

	if(word.slice(i-1, i+1) === "qu"){
		i++;
	}

	return word.slice(i) + word.slice(0,i) + "ay";
}




function isVowel(letter){
	letter = letter.toLowerCase();
	var vowels = "aeio";
	return vowels.indexOf(letter) > -1;
}