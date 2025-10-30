"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipments = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Shipments extends resource_1.APIResource {
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
        return this._client.get((0, path_1.path) `/shipments/${id}`, options);
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
        return this._client.getAPIList('/shipments', (pagination_1.CursorPage), { query, ...options });
    }
}
exports.Shipments = Shipments;
//# sourceMappingURL=shipments.js.map