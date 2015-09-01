(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    return x.inspect ? x.inspect() : x;
  }

  /**
    Identity

    Identity implements Semigroup, Monoid, Functor, Applicative,
    Monad, and Chain. Identity implements the concat, empty,
    map, ap, of, and chain methods to adhere to these algebras.
  **/
  var Identity = Constructor(function(value) {
    this.isEmpty = false;
    this.value = value;
  });

  /**
    Identity.empty

    Returns an empty Identity.
  **/
  Identity.prototype.empty = function() {
    var id = new Identity();
    id.isEmpty = true;
    return id;
  };

  /**
    Identity.concat

    Returns the result of value concatenation.
  **/
  Identity.prototype.concat = function(b) {
    if(this.isEmpty)   return b;
    else if(b.isEmpty) return this;
    else               return new Identity(this.value.concat(b.value));
  };

  /**
    Identity.map

    Returns an Identity containing a value transformed by the
    passed function.
  **/
  Identity.prototype.map = function(f) {
    return new Identity(f(this.value));
  };

  /**
    Identity.ap

    Returns an Identity containing the application of the value
    of the Identity with the passed value.
  **/
  Identity.prototype.ap = function(b) {
    return new Identity(this.value(b.value));
  };

  /**
    Identity.of

    Returns an Identity containing the passed value.
  **/
  Identity.prototype.of = function(a) {
    return new Identity(a);
  };

  /**
    Identity.chain

    Returns the application of the passed function with
    the value of the Identity.
  **/
  Identity.prototype.chain = function(f) {
    return f(this.value);
  };

  /**
    Identity.isEqual

    Compares two Identity's for equality.
  **/
  Identity.prototype.isEqual = function(a) {
    if(this.isEmpty) return a.isEmpty;
    return !a.isEmpty && deepEqual(this.value, a.value);
  };

  module.exports = Identity;
})();
