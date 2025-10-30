// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Apps extends APIResource {
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
        return this._client.get(path `/apps/${id}`, options);
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
        return this._client.patch(path `/apps/${id}`, { body, ...options });
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
        return this._client.getAPIList('/apps', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=apps.mjs.map