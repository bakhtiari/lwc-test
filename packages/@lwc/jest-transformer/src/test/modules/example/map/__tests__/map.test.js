/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { createElement } from 'lwc';
import Map from "example/map";

const DEFAULT_MAP_URL =
    'https://maps.fake.localhost.soma.forceusercontent.com:5678/lightningmaps/mapsloader?version=218';

describe('example-map-resource', () => {
    describe('@salesforce/map/url', () => {
        it('should be a valid import in a component', () => {
            const element = createElement('example-map', {
                is: Map,
            });

            const value = element.getUrl();
            expect(value).toBe(DEFAULT_MAP_URL);
        });
    });
});
