(function() {
  'use strict';

  var Identity = require('../lib/index.js');
  var assert = require('assert');
  var laws = require('algebra.laws');

  function makeId(a)    { return new Identity(a); }
  function makeListId(a) { return new Identity([a]); }

  describe('Algebraic Laws', function() {
    describe('Semigroup', function() {
      it('1. Associativity', function() { laws.semigroup.associativity(makeListId).asTest()(); });
    });

    describe('Monoid', function() {
      it('1. Right Identity', function() { laws.monoid.rightIdentity(makeId).asTest()(); });
      it('2. Left Identity',  function() { laws.monoid.leftIdentity(makeId).asTest()(); });
    });

    describe('Functor', function() {
      it('1. Identity',    function() { laws.functor.identity(makeId).asTest()(); });
      it('2. Composition', function() { laws.functor.composition(makeId).asTest()(); });
    });

    describe('Applicative', function() {
      it('1. Identity',     function() { laws.applicative.identity(makeId).asTest()(); });
      it('2. Composition',  function() { laws.applicative.composition(makeId).asTest()(); });
      it('3. Homomorphism', function() { laws.applicative.homomorphism(makeId).asTest()(); });
      it('4. Interchange',  function() { laws.applicative.interchange(makeId).asTest()(); });
    });

    describe('Chain', function() {
      it('1. Associativity', function() { laws.chain.associativity(makeId).asTest()(); });
    });

    describe('Monad', function() {
      it('1. Left Identity',  function() { laws.monad.leftIdentity(makeId).asTest()(); });
      it('2. Right Identity', function() { laws.monad.rightIdentity(makeId).asTest()(); });
    });
  });

  describe('Inspect', function() {
    it('should show string representaiton of Identity', function() {
      assert.equal(Identity(1).inspect(), 'Identity(1)');
    });
  });
})();
