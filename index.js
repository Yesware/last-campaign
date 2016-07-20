'use strict';

var querystring = require('querystring');
var cookie = require('cookie');
var merge = require('deepmerge');

/**
 * Module exports.
 * @public
 */
module.exports = saveLastCampaign;

/**
 * saveLastCampaign
 *
 * Saves campaign query string parameters into a session cookie so they can be
 * retrieved and passed to your marketing automation system when needed.
 *
 * @param {object} [opts] Options object.
 * @param {string} [opts.prefix] Cookie name prefix.
 * @param {array}  [opts.params] Default parameters.
 * @param {array}  [opts.extra]  Extra parameters.
 * @public
 */
function saveLastCampaign(opts) {

    var options = {
        defaults: true,
        prefix: '',
        params: [
            'utm_campaign',
            'utm_source',
            'utm_medium',
            'utm_term',
            'utm_content'
        ],
        data: {},
        path: '/',
        domain: null
    };

    var pageQueryString = getQueryString();
    var data = {};
    var cookieOptions = {};

    // Remove default parameters if necessary
    if (typeof opts === 'object') {
        if (typeof opts.defaults !== 'undefined' && opts.defaults === false) {
            options.params = [];
        }
    }

    // Merge opts onto options
    if (arguments.length && typeof opts === 'object') {
        options = merge(options, opts);
    }

    var dataKeys = Object.keys(options.data);

    // Set default cookie options
    cookieOptions = {
        domain: options.domain,
        path: options.path
    };

    // Parse the query string
    if (pageQueryString.length !== 0) {

        data = querystring.parse(pageQueryString);

        var removed = false;

        // Create the cookies
        options.params.forEach(function (key) {
            if (data[key]) {

                // param found in querystring so remove all necessary existing cookies first
                if (!removed) {
                    removeCookies(options, cookieOptions);
                    removed = true;
                }

                setCookie(cookie.serialize(options.prefix + key, data[key], cookieOptions));
            }
        });
    }

    // Save the data object
    if (dataKeys.length !== 0) {
        dataKeys.forEach(function (key) {

            // Create the cookie if it doesn't exist
            if (!getCookie(key)) {
                setCookie(cookie.serialize(options.prefix + key, options.data[key], cookieOptions));
            }
        });
    }

}

/**
 * Remove all cookies matching options.params
 * @param  {Object} options
 * @private
 */
function removeCookies(options, cookieOptions) {
    options.params.forEach(function (key) {
        setCookie(cookie.serialize(options.prefix + key, '', merge(cookieOptions, {
            expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT')
        })));
    });
}

/**
 * Returns the query string without its initial question mark.
 *
 * E.g. foo=bar&baz=qux
 *
 * @return {string}
 * @private
 */
function getQueryString() {
    return window.location.search.substring(1);
}

/**
 * Sets a browser cookie given a valid cookie string.
 *
 * E.g. "foo=bar; httpOnly"
 *
 * @param {string} cookie - a valid cookie string
 * @private
 */
function setCookie(cookie) {
    document.cookie = cookie;
}

/**
 * Returns cookie value
 *
 * @param {string} name name of cookie
 * @return {string} token
 * @private
 */
function getCookie(name) {
    if (arguments.length === 0 && typeof opts !== 'string') {
        return;
    }

    var match = document.cookie.match('(?:^|; )' + name + '=([^;]+)');

    if (match) {
        return match[1];
    } else {
        return '';
    }
}
