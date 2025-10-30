"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forums = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Forums extends resource_1.APIResource {
    /**
     * Retrieves a forum
     *
     * Required permissions:
     *
     * - `forum:read`
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/forums/${id}`, options);
    }
    /**
     * Updates a forum
     *
     * Required permissions:
     *
     * - `forum:moderate`
     */
    update(id, body = {}, options) {
        return this._client.patch((0, path_1.path) `/forums/${id}`, { body, ...options });
    }
    /**
     * Lists forums inside a company
     *
     * Required permissions:
     *
     * - `forum:read`
     */
    list(query, options) {
        return this._client.getAPIList('/forums', (pagination_1.CursorPage), { query, ...options });
    }
}
exports.Forums = Forums;
//# sourceMappingURL=forums.js.map