"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reviews = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Reviews extends resource_1.APIResource {
    /**
     * Retrieve a review by its ID
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/reviews/${id}`, options);
    }
    /**
     * List all reviews
     */
    list(query, options) {
        return this._client.getAPIList('/reviews', (pagination_1.CursorPage), { query, ...options });
    }
}
exports.Reviews = Reviews;
//# sourceMappingURL=reviews.js.map