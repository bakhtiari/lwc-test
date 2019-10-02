/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { createElement } from 'lwc';
import Private from 'example/private';

jest.mock(
    '@salesforce/private/core.appVersion',
    () => {
        return { default: 'appVersion value set in test' };
    },
    { virtual: true }
);

describe('example-private-resource', () => {
    describe('@salesforce/private/core.appVersion', () => {
        it('should return value from mock defined in test file', () => {
            const element = createElement('example-private', {
                is: Private,
            });

            const value = element.getAppVersion();
            expect(value).toBe('appVersion value set in test');
        });
    });

    describe('@salesforce/private/core.untrustedContentDomain', () => {
        it('should return default value as import path', () => {
            const element = createElement('example-private', {
                is: Private,
            });

            const value = element.getUntrustedContentDomain();
            expect(value).toBe('.a.forceusercontent.com');
        });
    });
});
