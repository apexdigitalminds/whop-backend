"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entries = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Entries extends resource_1.APIResource {
    /**
     * Retrieves an entry by ID
     *
     * Required permissions:
     *
     * - `plan:waitlist:read`
     * - `member:email:read`
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/entries/${id}`, options);
    }
    /**
     * Lists entries for a company
     *
     * Required permissions:
     *
     * - `plan:waitlist:read`
     * - `member:email:read`
     */
    list(query, options) {
        return this._client.getAPIList('/entries', (pagination_1.CursorPage), { query, ...options });
    }
    /**
     * Approve an entry
     *
     * Required permissions:
     *
     * - `plan:waitlist:manage`
     */
    approve(id, options) {
        return this._client.post((0, path_1.path) `/entries/${id}/approve`, options);
    }
    /**
     * Deny an entry
     *
     * Required permissions:
     *
     * - `plan:waitlist:manage`
     * - `plan:basic:read`
     * - `member:email:read`
     */
    deny(id, options) {
        return this._client.post((0, path_1.path) `/entries/${id}/deny`, options);
    }
}
exports.Entries = Entries;
//# sourceMappingURL=entries.js.map