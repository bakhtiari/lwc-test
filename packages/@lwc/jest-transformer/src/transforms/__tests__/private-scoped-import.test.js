/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const test = require('./utils/test-transform').test(require('../private-scoped-import'));

const DEFAULT_APP_VERSION = '224';

describe('@salesforce/private/core.appVersion import', () => {
    test(
        'does default transformation',
        `
    import url from '@salesforce/private/core.appVersion';
`,
        `
    let url;

    try {
      url = require("@salesforce/private/core.appVersion").default;
    } catch (e) {
      url = "${DEFAULT_APP_VERSION}";
    }
`
    );

    test(
        'allows non-@salesforce/private/core.appVersion named imports',
        `
    import { otherNamed } from './something-valid';
    import url from '@salesforce/private/core.appVersion';
`,
        `
    import { otherNamed } from './something-valid';
    let url;

    try {
      url = require("@salesforce/private/core.appVersion").default;
    } catch (e) {
      url = "${DEFAULT_APP_VERSION}";
    }
`
    );

    test(
        'throws error if using named import',
        `
    import { url } from '@salesforce/private/core.appVersion';
`,
        undefined,
        'Invalid import from @salesforce/private/core.appVersion'
    );

    test(
        'throws error if renamed default imports',
        `
    import { default as clientSize } from '@salesforce/private/core.appVersion';
`,
        undefined,
        'Invalid import from @salesforce/private/core.appVersion'
    );

    test(
        'throws error if renamed multiple default imports',
        `
    import { default as label, foo } from '@salesforce/private/core.appVersion';
`,
        undefined,
        'Invalid import from @salesforce/private/core.appVersion'
    );
});
