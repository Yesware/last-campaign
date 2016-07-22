var expect = require('chai').expect;
var jsdom = require('jsdom').jsdom;
var lastCampaign = require('..');

beforeEach(function () {

    global.document = jsdom('', {
        url: 'http://www.yesware.com/'
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
            window.location.href = '/path/?foo=bar&utm_campaign=test&utm_medium=test&utm_source=test&utm_term=test&utm_content=test';
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

        it('should set cookies with the correct sub-domain', function () {

            lastCampaign({
                domain: '.yesware.com'
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.include('utm_term=test');
            expect(document.cookie).to.include('utm_content=test');
        });

        it('should set cookies with the correct sub-domain', function () {

            lastCampaign({
                domain: '.notyesware.com'
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.not.include('utm_medium=test');
            expect(document.cookie).to.not.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
        });

        it('should set cookies with the correct path', function () {

            lastCampaign({
                path: '/path/'
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.include('utm_term=test');
            expect(document.cookie).to.include('utm_content=test');
        });

        it('should set cookies with the correct path', function () {

            lastCampaign({
                path: '/different-path/'
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.not.include('utm_medium=test');
            expect(document.cookie).to.not.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
        });

        it('should remove any previously set cookies', function () {

            lastCampaign();

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.include('utm_term=test');
            expect(document.cookie).to.include('utm_content=test');

            window.location.href = '/path/?foo=bar&utm_campaign=test';

            lastCampaign();

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.not.include('utm_medium=test');
            expect(document.cookie).to.not.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
        });

    });

    describe('with additional data', function () {

        beforeEach(function () {
            window.location.href = '/path/?foo=bar&utm_campaign=test&utm_medium=test&utm_source=test&utm_term=test&utm_content=test';
        });

        it('should only set the correct cookies', function () {

            lastCampaign({
                data: {
                    baz: 'qux'
                }
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.include('utm_term=test');
            expect(document.cookie).to.include('utm_content=test');
            expect(document.cookie).to.include('baz=qux');
        });

        it('should only set the specified cookies', function () {

            lastCampaign({
                defaults: false,
                params: ['utm_source', 'utm_medium'],
                data: {
                    baz: 'qux'
                }
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.include('utm_medium=test');
            expect(document.cookie).to.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
            expect(document.cookie).to.include('baz=qux');
        });

        it('should only set the specified cookie', function () {

            lastCampaign({
                defaults: false,
                data: {
                    baz: 'qux'
                }
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.not.include('utm_medium=test');
            expect(document.cookie).to.not.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
            expect(document.cookie).to.include('baz=qux');
        });

        it('should not set null, undefined or empty cookies', function () {

            var qux;

            lastCampaign({
                defaults: false,
                data: {
                    baz: qux,
                    wibble: null,
                    wobble: '',
                    wubble: 0,
                    fibble: true,
                    fubble: false
                }
            });

            expect(document.cookie).to.not.include('foo=bar');
            expect(document.cookie).to.not.include('utm_campaign=test');
            expect(document.cookie).to.not.include('utm_medium=test');
            expect(document.cookie).to.not.include('utm_source=test');
            expect(document.cookie).to.not.include('utm_term=test');
            expect(document.cookie).to.not.include('utm_content=test');
            expect(document.cookie).to.not.include('baz');
            expect(document.cookie).to.not.include('wibble');
            expect(document.cookie).to.not.include('wobble');
            expect(document.cookie).to.include('wubble');
            expect(document.cookie).to.include('fibble');
            expect(document.cookie).to.include('fubble');
        });

    });

});
