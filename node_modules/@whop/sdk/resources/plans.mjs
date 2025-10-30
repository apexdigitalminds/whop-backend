// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Plans extends APIResource {
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
        return this._client.get(path `/plans/${id}`, options);
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
        return this._client.patch(path `/plans/${id}`, { body, ...options });
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
        return this._client.getAPIList('/plans', (CursorPage), { query, ...options });
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
        return this._client.delete(path `/plans/${id}`, options);
    }
}
//# sourceMappingURL=plans.mjs.map