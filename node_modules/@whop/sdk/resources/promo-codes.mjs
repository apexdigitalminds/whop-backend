// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class PromoCodes extends APIResource {
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
        return this._client.get(path `/promo_codes/${id}`, options);
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
        return this._client.getAPIList('/promo_codes', (CursorPage), { query, ...options });
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
        return this._client.delete(path `/promo_codes/${id}`, options);
    }
}
//# sourceMappingURL=promo-codes.mjs.map