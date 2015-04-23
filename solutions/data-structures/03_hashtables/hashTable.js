var NUMBUCKETS = 25

var Hash = function() {
  this.numBuckets = NUMBUCKETS
  this.arr = []
  for(var i = 0; i < this.numBuckets; i++) {
    this.arr[i] = new LinkedList()
  }
}

Hash.prototype._hash = function(key) {
  var sum = 0;
  for (var i = 0; i < key.length; i++) {
    sum += key.charCodeAt(i);
  }
  return sum % this.numBuckets;
}

Hash.prototype.set = function(key, val) {
  if(typeof key !== 'string') throw new TypeError('Keys must be strings')
  var bucket = this.arr[this._hash(key)]
  bucket.addToHead({
    key: key,
    val: val
  })
}

Hash.prototype.get = function(key) {
  //hash the key
  //index into the array at that key
  //traverse the linked list looking for the node
  var bucket = this.arr[this._hash(key)]
  var hashNode = bucket.search(function(node) {
    return node.value.key === key
  })
  return hashNode.val
}


Hash.prototype.hasKey = function(key) {
  return !!this.get(key)
}








