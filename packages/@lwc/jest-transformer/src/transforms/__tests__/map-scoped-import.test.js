/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const test = require('./utils/test-transform').test(require('../map-scoped-import'));

const DEFAULT_MAP_URL =
    'https://maps.fake.localhost.soma.forceusercontent.com:5678/lightningmaps/mapsloader?version=218';

describe('@salesforce/map/url import', () => {
    test(
        'does default transformation',
        `
    import url from '@salesforce/map/url';
`,
        `
    let url;

    try {
      url = require("@salesforce/map/url").default;
    } catch (e) {
      url = "${DEFAULT_MAP_URL}";
    }
`
    );

    test(
        'allows non-@salesforce/map/url named imports',
        `
    import { otherNamed } from './something-valid';
    import url from '@salesforce/map/url';
`,
        `
    import { otherNamed } from './something-valid';
    let url;

    try {
      url = require("@salesforce/map/url").default;
    } catch (e) {
      url = "${DEFAULT_MAP_URL}";
    }
`
    );

    test(
        'throws error if using named import',
        `
    import { url } from '@salesforce/map/url';
`,
        undefined,
        'Invalid import from @salesforce/map/url'
    );

    test(
        'throws error if renamed default imports',
        `
    import { default as clientSize } from '@salesforce/map/url';
`,
        undefined,
        'Invalid import from @salesforce/map/url'
    );

    test(
        'throws error if renamed multiple default imports',
        `
    import { default as label, foo } from '@salesforce/map/url';
`,
        undefined,
        'Invalid import from @salesforce/map/url'
    );
});
