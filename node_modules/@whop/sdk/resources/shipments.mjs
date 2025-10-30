// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Shipments extends APIResource {
    /**
     * Creates a new shipment
     *
     * Required permissions:
     *
     * - `shipment:create`
     * - `payment:basic:read`
     *
     * @example
     * ```ts
     * const shipment = await client.shipments.create({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     *   payment_id: 'pay_xxxxxxxxxxxxxx',
     *   tracking_code: 'tracking_code',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/shipments', { body, ...options });
    }
    /**
     * Retrieves a shipment by ID
     *
     * Required permissions:
     *
     * - `shipment:basic:read`
     * - `payment:basic:read`
     *
     * @example
     * ```ts
     * const shipment = await client.shipments.retrieve(
     *   'ship_xxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get(path `/shipments/${id}`, options);
    }
    /**
     * Lists shipments for a payment
     *
     * Required permissions:
     *
     * - `shipment:basic:read`
     * - `payment:basic:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const shipmentListResponse of client.shipments.list()) {
     *   // ...
     * }
     * ```
     */
    list(query = {}, options) {
        return this._client.getAPIList('/shipments', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=shipments.mjs.map