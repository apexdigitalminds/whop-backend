"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plans = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Plans extends resource_1.APIResource {
    /**
     * Create a new Plan
     *
     * Required permissions:
     *
     * - `plan:create`
     * - `access_pass:basic:read`
     * - `plan:basic:read`
     *
     * @example
     * ```ts
     * const plan = await client.plans.create({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     *   product_id: 'prod_xxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/plans', { body, ...options });
    }
    /**
     * Retrieves a plan by ID
     *
     * Required permissions:
     *
     * - `plan:basic:read`
     *
     * @example
     * ```ts
     * const plan = await client.plans.retrieve(
     *   'plan_xxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/plans/${id}`, options);
    }
    /**
     * Update an existing Plan
     *
     * Required permissions:
     *
     * - `plan:update`
     * - `access_pass:basic:read`
     * - `plan:basic:read`
     *
     * @example
     * ```ts
     * const plan = await client.plans.update(
     *   'plan_xxxxxxxxxxxxx',
     * );
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch((0, path_1.path) `/plans/${id}`, { body, ...options });
    }
    /**
     * Lists plans for a company
     *
     * Required permissions:
     *
     * - `plan:basic:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const planListResponse of client.plans.list({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     * })) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/plans', (pagination_1.CursorPage), { query, ...options });
    }
    /**
     * Delete an existing Plan
     *
     * Required permissions:
     *
     * - `plan:delete`
     *
     * @example
     * ```ts
     * const plan = await client.plans.delete(
     *   'plan_xxxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id, options) {
        return this._client.delete((0, path_1.path) `/plans/${id}`, options);
    }
}
exports.Plans = Plans;
//# sourceMappingURL=plans.js.map