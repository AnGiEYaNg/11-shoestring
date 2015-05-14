var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest');
var ourExpressApp = require('../app');

var Page = require('../models').Page;

var app = supertest(ourExpressApp);

describe('http requests', function() {

    beforeEach(function (done) {
        Page.remove({}, done);
    });

    beforeEach(function (done) {
        Page.create({
            title: 'Anolis carolinensis',
            body: 'Small dewlapping lizard native to the southeastern USA.',
            tags: ['lizard', 'USA']
        }, done);
    });

    describe('GET /', function() {

        it('should get 200 on index', function (done) {
            app.get('/').expect(200, done);
        });

    });

    describe('GET /wiki/:title', function() {
        it('should get 404 on page that doesnt exist', function(done) {
            app.get('/wiki/Doesnt_Exist').expect(404, done);
        })
        it('should get 200 on page that does exist', function(done) {
            app.get('/wiki/Anolis_carolinensis').expect(200, done);
        })
    })

    describe('GET /wiki/tags/:tag', function() {
        it('should get 200', function(done) {
            app.get('/wiki/tags/sdlkjfsdf').expect(200, done);
        })
    })

    describe('GET /wiki/:title/similar', function() {
        it('should get 404 for page that doesn\'t exist', function(done) {
            app.get('/wiki/Doesnt_Exist/similar').expect(404, done);
        })
        it('should get 200 for similar page', function(done) {
            app.get('/wiki/Anolis_carolinensis/similar').expect(200, done);
        });
    })

    describe('GET /wiki/:title/edit', function() {
        it('should get 404 for page that doesn\'t exist', function(done) {
            app.get('/wiki/Doesnt_Exist/edit').expect(404, done);
        })
        it('should get 200 for similar page', function(done) {
            app.get('/wiki/Anolis_carolinensis/edit').expect(200, done);
        })
    })

    describe('GET /add', function() {
        it('should get 200', function(done) {
            app.get('/add').expect(200, done);
        });
    });

    describe('POST /wiki/:title/edit', function() {
        it('should get 404 for page that doesn\'t exist', function(done) {
            app
                .post('/wiki/Doesnt_exist/edit')
                .send({
                    title: 'A valid title',
                    body: 'A valid body',
                    tags: ['atag']
                })
                .expect(404, done);
        })

        it('should update db', function(done) {
            app
                .post('/wiki/Anolis_carolinensis/edit')
                .send({
                    body: 'An updated article about the green anole.',
                    tags: 'green,carolina,anole'
                })
                .expect(200)
                .end(function (err, response) {
                    Page.findOne({ title: 'Anolis carolinensis' }, function (err, page) {
                        expect(page.body).to.equal('An updated article about the green anole.');
                        expect(page.tags).to.have.lengthOf(3);
                        done();
                    });
                });
        });
    });

    describe('POST /add/submit', function() {
        it('should create in db', function(done) {

            app
                .post('/add/submit')
                .send({
                    title: 'Watermelon',
                    body: 'A tasty fruit',
                    tags: 'fruit,summer'
                })
                .end(function (err, response) {
                    Page.find({ title: 'Watermelon' }, function (err, pages) {
                        expect(pages).to.have.lengthOf(1);
                        expect(pages[0].title).to.equal('Watermelon');
                        done();
                    });
                });

        });
    });

})