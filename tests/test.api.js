/*jshint expr: true*/
'use strict';

var request = require('supertest'),
    app = require('../app/server');
var chai = require('chai');

describe('Api Testing', function () {
    it('should return a valid response', function (done) {
        request(app)
            .get('/api/test')
            .expect(200)
            .end(function (err, res) {
                chai.expect(err).to.not.exist;
                var resText = JSON.parse(res.text);
                chai.assert.equal('Testing! welcome to the api!', resText.message);
                done();
            });
    });

    it('should return a not found response on wrong url', function (done) {
        request(app)
            .get('/api/data')
            .expect(404)
            .end(function () {
                done();
            });
    });
});
