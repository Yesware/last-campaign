var expect = require('chai').expect;
var jsdom = require('jsdom').jsdom;
var lastCampaign = require('..');

beforeEach(function () {

    global.document = jsdom('', {
        url: 'http://server/'
    });
    global.window = global.document.defaultView;

});

describe('lastCampaign', function () {
    it('should not set any cookies by default', function () {

        lastCampaign()

        expect(document.cookie).to.be.equal('');
    });

    describe('with a query string', function () {

        beforeEach(function () {
            window.location.href = '/?foo=bar&utm_campaign=test&utm_medium=test&utm_source=test&utm_term=test&utm_content=test';
        });

        it('should only set the correct cookies', function () {

            lastCampaign();

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.include('utm_term=test');
            expect(document.cookie).to.include('utm_content=test');
        });

        it('should only set the specified cookies', function () {

            lastCampaign({
                defaults: false,
                params: ['utm_source', 'utm_medium']
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
        });

        it('should set specified extra cookies', function () {

            lastCampaign({
                params: ['foo']
            });

            expect(document.cookie).to.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.include('utm_term=test');
            expect(document.cookie).to.include('utm_content=test');
        });

        it('should only set the specified cookie', function () {

            lastCampaign({
                defaults: false,
                params: ['foo']
            });

            expect(document.cookie).to.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.not.include('utm_medium=test');
            expect(document.cookie).to.not.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
        });

        it('should use the specified cookie prefix', function () {

            lastCampaign({
                prefix: '_'
            });

            expect(document.cookie).to.not.include('_foo=bar');
            expect(document.cookie).to.include('_utm_campaign=test');
            expect(document.cookie).to.include('_utm_medium=test');
            expect(document.cookie).to.include('_utm_source=test');
            expect(document.cookie).to.include('_utm_term=test');
            expect(document.cookie).to.include('_utm_content=test');
        });

    });

});



