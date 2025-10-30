"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Products extends resource_1.APIResource {
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
        return this._client.get((0, path_1.path) `/products/${id}`, options);
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
        return this._client.patch((0, path_1.path) `/products/${id}`, { body, ...options });
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
        return this._client.getAPIList('/products', (pagination_1.CursorPage), { query, ...options });
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
        return this._client.delete((0, path_1.path) `/products/${id}`, options);
    }
}
exports.Products = Products;
//# sourceMappingURL=products.js.map