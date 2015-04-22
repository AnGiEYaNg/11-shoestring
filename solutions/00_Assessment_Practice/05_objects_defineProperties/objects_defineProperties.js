function Mammal(name){
	Object.defineProperties(this, 
		{
			'name': { value: name},
			'offspring': { value: [] }
		});
}


Mammal.prototype.sayHello = function(){
	return "My name is " + this.name + ", I'm a " + this.constructor.name;
}

Mammal.prototype.haveBaby = function(){
	var currentBaby = new this.constructor("Baby " + this.name, arguments[0]);
	this.offspring.push(currentBaby);
	return currentBaby;
}

function Cat(name, color){
	Mammal.call(this, name);
	Object.defineProperty(this, 'color', {
		value: color
	});
}

Cat.prototype = Object.create(Mammal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.haveBaby = function(color){
	return Mammal.prototype.haveBaby.call(this, color);
}


