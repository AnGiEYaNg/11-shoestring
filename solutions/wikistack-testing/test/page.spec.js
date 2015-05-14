var Page = require('../models').Page;

var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);

var expect = chai.expect;

describe('Page Model', function () {

    beforeEach(function (done) {
        Page.remove({}, done);
    });

    describe('Validations', function () {

        var page;

        beforeEach(function () {
            page = new Page();
        });

        it('should err without title', function (done) {
            page.validate(function (err) {
                expect(err.errors).to.have.property('title');
                done();
            });
        });

        it('should err with title of zero length', function (done) {
            page.title = '';
            page.validate(function (err) {
                expect(err.errors).to.have.property('title');
                done();
            });
        });

        it('should err without body', function (done) {
            page.validate(function (err) {
                expect(err.errors).to.have.property('body');
                done();
            });
        });
    });

    describe('Statics', function () {

        beforeEach(function (done) {
            Page.create({
                title: 'foo',
                body: 'bar',
                tags: ['bubbles', 'glorp']
            }, done);
        });

        describe('findBytag', function () {

            it('should get pages with the search tag', function (done) {

                Page.findByTag('bubbles', function (err, pages) {
                    expect(pages).to.have.lengthOf(1);
                    done();
                });

            });

            it('should not get pages without the search tag', function (done) {

                Page.findByTag('sldjflsdjf', function (err, pages) {
                    expect(pages).to.have.lengthOf(0);
                    done();
                });

            });
        })
    });

    describe('Methods', function () {
        describe('computeUrlName', function () {

            it('should convert non-word-like chars to underscores', function () {

                var page = new Page({title: 'two words'});
                expect(page.url_name).to.be.equal(undefined);
                page.computeUrlName();
                expect(page.url_name).to.be.equal('two_words');

            });

        });
        describe('getSimilar', function () {

            var russiaPage, panamaPage, watermelonPage;

            beforeEach(function (done) {

                Page.create([{
                    title: 'Russia',
                    body: 'A glorious country. I\'ve heard it\'s cold in winter.',
                    tags: ['winter', 'country']
                }, {
                    title: 'Panama',
                    body: 'Another glorious country. I\'ve heard it\'s warm in summer.',
                    tags: ['country', 'summer']
                }, {
                    title: 'Watermelon',
                    body: 'A fruit often eaten in the summer. Not to be confused with Russia.',
                    tags: ['summer', 'fruit']
                }], function (err, pages) {
                    russiaPage = pages[0];
                    panamaPage = pages[1];
                    watermelonPage = pages[2];
                    done();
                });

            });

            it('should never get itself', function (done) {
                russiaPage.getSimilar(function (err, similarPages) {
                    expect(similarPages.length).to.be.equal(1);
                    expect(similarPages[0].title).to.not.be.equal('Russia');
                    done();
                });
            });

            it('should get other pages with any common tags', function (done) {
                russiaPage.getSimilar(function (err, similarPages) {
                    expect(similarPages.length).to.be.equal(1);
                    expect(similarPages[0].title).to.be.equal('Panama');
                    done();
                });
            });

            it('should not get other pages without any common tags', function (done) {
                russiaPage.getSimilar(function (err, similarPages) {
                    expect(similarPages.length).to.be.equal(1);
                    expect(similarPages[0].title).to.be.not.equal('Watermelon');
                    done();
                });
            });
        });
    });

    describe('Virtuals', function () {
        describe('full_route', function () {
            it('should return the url_name prepended by "/wiki/"', function() {
                var page = new Page({url_name: 'Suite_Judy_Blue_Eyes'});
                expect(page.full_route).to.equal('/wiki/Suite_Judy_Blue_Eyes');
            });
        });
    });

    describe('Hooks', function () {
        it('should call computeUrlName before save', function (done) {

            var page = new Page({
                title: 'An Interesting Article',
                body: 'Whatever'
            });

            page.computeUrlName = chai.spy(page.computeUrlName);

            page.save(function (err, page) {
                expect(page.computeUrlName).to.have.been.called();
                done();
            });

        });
    });

});