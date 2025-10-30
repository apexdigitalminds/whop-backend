"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apps = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Apps extends resource_1.APIResource {
    /**
     * Create a new App
     *
     * Required permissions:
     *
     * - `developer:create_app`
     * - `developer:manage_api_key`
     *
     * @example
     * ```ts
     * const app = await client.apps.create({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     *   name: 'name',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/apps', { body, ...options });
    }
    /**
     * Retrieves an app by ID
     *
     * Required permissions:
     *
     * - `developer:manage_api_key`
     *
     * @example
     * ```ts
     * const app = await client.apps.retrieve(
     *   'app_xxxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/apps/${id}`, options);
    }
    /**
     * Update an existing App
     *
     * Required permissions:
     *
     * - `developer:update_app`
     * - `developer:manage_api_key`
     *
     * @example
     * ```ts
     * const app = await client.apps.update('app_xxxxxxxxxxxxxx');
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch((0, path_1.path) `/apps/${id}`, { body, ...options });
    }
    /**
     * Fetches a list of apps
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const appListResponse of client.apps.list()) {
     *   // ...
     * }
     * ```
     */
    list(query = {}, options) {
        return this._client.getAPIList('/apps', (pagination_1.CursorPage), { query, ...options });
    }
}
exports.Apps = Apps;
//# sourceMappingURL=apps.js.map