/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//-----------------------------------------
// Queues

function Queue() {
  this.queue = [];
  // simple solution: just .push and .shift. But let's use pointers:
  this.head = this.tail = 0;
}

Queue.prototype.add = function(item) {
  // simple solution: just .push. But with pointers:
  this.queue[this.tail] = item;
  this.tail++;
  return this; // chaining
};

Queue.prototype.remove = function() {
  // simple solution: just .shift. But with pointers:
  if (this.head === this.tail) return;
  this.head++;
  return this.queue[this.head - 1];
};

//-----------------------------------------
// Stacks

function Stack() {
  this.stack = [];
  // simple solution: just .push and .shift. But let's use pointers:
  this.head = this.tail = 0;
}

Stack.prototype.add = function(item) {
  // simple solution: just .push. But with pointers:
  this.stack[this.tail] = item;
  this.tail++;
  return this; // chaining
};

Stack.prototype.remove = function() {
  // simple solution: just .shift. But with pointers:
  if (this.head === this.tail) return;
  this.tail--;
  return this.stack[this.tail];
};

//-----------------------------------------
// Linked lists

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function(item) {
  // we have to set the tail, link the old tail, and maybe set the head
  var newNode = new ListNode(item, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
  return this; // chaining
};

LinkedList.prototype.removeFromTail = function() {
  if (!this.tail) return;
  // we have to remove the tail, unlink old tail, & maybe unset the head
  var oldNode = this.tail;
  this.tail = this.tail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return oldNode.item;
};

LinkedList.prototype.forEach = function(iterator) {
  // traverse each node and call the iterator function on each node.item
  var currentNode = this.head;
  while (currentNode) {
    iterator(currentNode.item);
    currentNode = currentNode.next;
  }
};

//-----------------------------------------
// Hash tables

function _hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashNode (key, value) {
  this.key = key;
  this.value = value;
}

function Hash () {
  this.buckets = Array(20);
  // cannot `map` over "holes" in a constructed array — D'OH!
  for (var i = 0, ii = this.buckets.length; i < ii; i++) {
    this.buckets[i] = new LinkedList();
  }
}

Hash.prototype.set = function(key, value) {
  // make a hash node (associates key & val), put it in the right list
  this.buckets[_hash(key)].addToTail(new HashNode(key, value));
  return this; // chaining
};

Hash.prototype.get = function(key) {
  // check each node in the right list; if it has the key, get the value; return the last one that matches.
  var value;
  this.buckets[_hash(key)].forEach(function(item){
    if (item.key === key) value = item.value;
  });
  return value;
};
