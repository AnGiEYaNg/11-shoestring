function f2c(f) {
  return (f-32)*5/9;
}
 
function c2f(c) {
  return (c*9/5)+32;
}
 
function Temperature(f) {
  // this.fah = f;
  var fah = f;  
  this.getF = function(){
    return fah;
  };
  
  this.setF = function(_fah) {
    fah = _fah;
  };
}
 
Temperature.prototype.setFahrenheit = function(f) {
  this.setF(f);
};
 
Temperature.prototype.fahrenheit = function() {
  return this.getF();
};
 
Temperature.prototype.celcius = function() {
  return f2c(this.getF());
};
 
Temperature.prototype.setCelcius = function(c) {
  this.setF(c2f(c));
};



























