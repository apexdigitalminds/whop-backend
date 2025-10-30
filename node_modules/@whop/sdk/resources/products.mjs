// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Products extends APIResource {
    /**
     * Creates a new Product
     *
     * Required permissions:
     *
     * - `access_pass:create`
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * const product = await client.products.create({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     *   title: 'title',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/products', { body, ...options });
    }
    /**
     * Retrieves a product by ID or route
     *
     * Required permissions:
     *
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * const product = await client.products.retrieve(
     *   'prod_xxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get(path `/products/${id}`, options);
    }
    /**
     * Updates an existing Product
     *
     * Required permissions:
     *
     * - `access_pass:update`
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * const product = await client.products.update(
     *   'prod_xxxxxxxxxxxxx',
     * );
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch(path `/products/${id}`, { body, ...options });
    }
    /**
     * Lists products for a company
     *
     * Required permissions:
     *
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const productListItem of client.products.list({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     * })) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/products', (CursorPage), { query, ...options });
    }
    /**
     * Deletes an existing Product
     *
     * Required permissions:
     *
     * - `access_pass:delete`
     *
     * @example
     * ```ts
     * const product = await client.products.delete(
     *   'prod_xxxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id, options) {
        return this._client.delete(path `/products/${id}`, options);
    }
}
//# sourceMappingURL=products.mjs.map