//Import the testing libraries
var expect = require('chai').expect;

//Import EmitIt
var EmitIt = require('../lib/EmitIt.js');

var emitter = new EmitIt();
var executed = false;
var argTest = null;
emitter.subscribe('test', function (foo, bar) {
    executed = true;
    argTest = bar;
});

describe('EmitIt methods', function () {
    it('creates events', function () {
        expect('test' in emitter.subscribers).to.equal(true);
    });

    it('subscribes functions', function () {
        expect(emitter.event('test')).to.not.equal(false);
    });

    it('executes subscribed functions', function () {
        emitter.emit('test', 'success');
        expect(executed).to.equal(true);
    });

    it('passes additional arguments to the subscriber', function() {
        expect(argTest).to.equal('success');
    });

    it('clears subscribers from events', function () {
        emitter.event('test').clear();
        expect(emitter.subscribers['test'].length).to.equal(0);
    });

    it('removes events entirely', function () {
        emitter.event('test').remove();
        expect('test' in emitter.subscribers).to.equal(false);
    });
});