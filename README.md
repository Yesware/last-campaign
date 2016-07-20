# Last Campaign

Saves the last campaign (utm) query string parameters found on the current URL into a session cookie; so that they can be passed to your marketing automation system at any time during the users session.

By default, only `utm_campaign`, `utm_source`, `utm_medium`, `utm_content`, and `utm_term` are saved. Extra parameters can also be saved by passing them in via the `options.params` object. If the query string contains any of the parameters to be saved, a new session is assumed and previously set cookies will be removed.

`lastCampaign()` should be called on each page view.

Note: This is currently a browser only module because it reads the query string from `window.location.search` and sets cookies via the `document.cookie`. It could however, easily be modified to run as an express middleware and work on the server side.

Version 2 of last-campaign by default now sets cookies with a default session timeout of 30 minutes rather than a session cookie.

## Installation & Usage

### NPM
`$ npm install last-campaign`

```
var lastCampaign = require('last-campaign');
lastCampaign();
```

### Bower
`$ bower install last-campaign`

```
lastCampaign();
```

## Options

### `timeout` (Number)

Default session timeout in minutes. This should match the session timeout used in Google Analyutcs. Default `30`

Passing in `null` will disable the session timeout and revert to using a session cookie. E.g. `timeout: null`

### `prefix` (String)

Cookie name prefix. Default `''`

### `params` (Array)

An array of additional query string parameters to save. E.g. `['gclid']`.

### `data` (Object)

An object of additional values to save. Values are only saved once per session.

### `defaults` (Boolean)

Specify if the default parameters, `utm_campaign`, `utm_source`, `utm_medium`, `utm_content`, and `utm_term` should be saved. Default `true`

### `domain` (String)

Specify a domain to set cookie on. If you want this to work across all of your sub-domains, set this to your domain name prefixed with a period. E.g. `.yesware.com`

Default `null`

### `path` (String)

Cookie path.

Default `/`

## Examples

### Save `gclid` AdWords ID in addition to default parameters
```
lastCampaign({
    params: ['gclid']
});
```

### Save only the `foo` parameter with an `_` prefix
```
lastCampaign({
    prefix: '_',
    defaults: false,
    params: ['foo']
});
```

### Save `foo` value in addition to default parameters
```
lastCampaign({
    data: {
        foo: 'bar'
    }
});
```

## MIT License

Copyright © 2016 Yesware, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
