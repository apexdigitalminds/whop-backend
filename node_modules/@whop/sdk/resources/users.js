"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const resource_1 = require("../core/resource.js");
const path_1 = require("../internal/utils/path.js");
class Users extends resource_1.APIResource {
    /**
     * Retrieves a user by ID or username
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/users/${id}`, options);
    }
    /**
     * Check if a user has access (and their access level) to a resource
     */
    checkAccess(resourceID, params, options) {
        const { id } = params;
        return this._client.get((0, path_1.path) `/users/${id}/access/${resourceID}`, options);
    }
}
exports.Users = Users;
//# sourceMappingURL=users.js.map