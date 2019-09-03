/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const { stringScopedImportTransform } = require('./utils');

const MAP_IMPORT_IDENTIFIER = '@salesforce/map/';
const WHITELISTED_RESOURCE_MOCK_VALUE = {
    url:
        'https://maps.fake.localhost.soma.forceusercontent.com:5678/lightningmaps/mapsloader?version=218',
};
module.exports = function({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path) {
                const importId = path.get('source.value').node;

                if (importId.startsWith(MAP_IMPORT_IDENTIFIER)) {
                    const resourceId = importId.substring(MAP_IMPORT_IDENTIFIER.length);
                    const mockValue = WHITELISTED_RESOURCE_MOCK_VALUE[resourceId];

                    stringScopedImportTransform(t, path, importId, mockValue);
                }
            },
        },
    };
};
