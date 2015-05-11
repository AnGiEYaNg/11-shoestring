var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = require('chai').expect;

describe('Testing suite capabilities', function () {

    it('confirms basic arithmetic', function () {
        expect(2+2).to.equal(4);
    });

    it('confirms setTimeout\'s timer accuracy', function (done) {
        var start = new Date();
        setTimeout(function () {
            var duration = new Date() - start;
            expect(duration).to.be.closeTo(1000, 50);
            done();
        }, 1000);
    });

    it('confirms that forEach will invoke a function once per element', function () {
        var arr = ['x','y','z'];
        function logNth (val, idx) {
            console.log('Logging elem #'+idx+':', val);
        };
        var spy = chai.spy(logNth);
        arr.forEach(spy);
        expect(spy).to.have.been.called.exactly(arr.length);
    });
});