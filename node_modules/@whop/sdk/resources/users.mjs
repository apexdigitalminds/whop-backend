// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { path } from "../internal/utils/path.mjs";
export class Users extends APIResource {
    /**
     * Retrieves a user by ID or username
     */
    retrieve(id, options) {
        return this._client.get(path `/users/${id}`, options);
    }
    /**
     * Check if a user has access (and their access level) to a resource
     */
    checkAccess(resourceID, params, options) {
        const { id } = params;
        return this._client.get(path `/users/${id}/access/${resourceID}`, options);
    }
}
//# sourceMappingURL=users.mjs.map