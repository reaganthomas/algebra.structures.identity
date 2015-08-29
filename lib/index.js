(function() {
  'use strict';

  var equals = require('deep-equal');

  function Identity(x) {
    this.id = 'Identity';
    this.isEmpty = false;
    this.value = x;
  }

  // Required by Semigroup
  Identity.prototype.concat = function(b) {
    if(this.isEmpty)   return b;
    else if(b.isEmpty) return this;
    else               return new Identity(this.value.concat(b.value));
  };

  // Required by Monoid
  Identity.prototype.empty = function() {
    var id = new Identity();
    id.isEmpty = true;
    return id;
  };

  // Required by Functor
  Identity.prototype.map = function(f) {
    return new Identity(f(this.value));
  };

  // Required by Applicative / Monad
  Identity.prototype.ap = function(b) {
    return new Identity(this.value(b.value));
  };

  Identity.prototype.of = function(a) {
    return new Identity(a);
  };

  // Required by Chain / Monad
  Identity.prototype.chain = function(f) {
    return f(this.value);
  };

  // Equality for testing
  Identity.prototype.isEqual = function(a) {
    if(this.isEmpty) return a.isEmpty;
    return !a.isEmpty && equals(this.value, a.value);
  };

  module.exports = Identity;
})();
