'use strict';
var chai = require('chai');

// Dummy test to check if mocha and chai are setup properly
describe('Array', function () {
    it('should return -1 when the value is not present', function () {
        chai.assert.equal(-1, [1, 2, 3].indexOf(5));
        chai.assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});