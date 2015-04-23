var Queue = function() {
  this.head = 0
  this.tail = 0
  this.memory = []
}

Queue.prototype.enqueue = function(value) {
  this.memory[this.tail++] = value
  // if(typeof this.tail === 'undefined') {
  //   this.memory[0] = value
  //   this.head = 0
  //   this.tail = 0
  // } else {
  //   this.memory[this.tail+1] = value
  //   this.tail++
  // }
}

Queue.prototype.dequeue = function() {
  if(this.size()) {
    var toReturn = this.memory[this.head]
    this.head++
    return toReturn
  }
}

Queue.prototype.size = function() {
  return this.tail - this.head
}