"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodes = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class PromoCodes extends resource_1.APIResource {
    /**
     * Create a new promo code for a product or plan
     *
     * Required permissions:
     *
     * - `promo_code:create`
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * const promoCode = await client.promoCodes.create({
     *   amount_off: 6.9,
     *   base_currency: 'usd',
     *   code: 'code',
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     *   new_users_only: true,
     *   promo_duration_months: 42,
     *   promo_type: 'percentage',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/promo_codes', { body, ...options });
    }
    /**
     * Retrieves a promo code by ID
     *
     * Required permissions:
     *
     * - `promo_code:basic:read`
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * const promoCode = await client.promoCodes.retrieve(
     *   'promo_xxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/promo_codes/${id}`, options);
    }
    /**
     * Lists promo codes for a company
     *
     * Required permissions:
     *
     * - `promo_code:basic:read`
     * - `access_pass:basic:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const promoCodeListResponse of client.promoCodes.list(
     *   { company_id: 'biz_xxxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/promo_codes', (pagination_1.CursorPage), { query, ...options });
    }
    /**
     * Archive a promo code, preventing further use
     *
     * Required permissions:
     *
     * - `promo_code:delete`
     *
     * @example
     * ```ts
     * const promoCode = await client.promoCodes.delete(
     *   'promo_xxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id, options) {
        return this._client.delete((0, path_1.path) `/promo_codes/${id}`, options);
    }
}
exports.PromoCodes = PromoCodes;
//# sourceMappingURL=promo-codes.js.map