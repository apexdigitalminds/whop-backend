"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfers = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Transfers extends resource_1.APIResource {
    /**
     * Creates a new transfer between ledger accounts
     *
     * Required permissions:
     *
     * - `payout:transfer_funds`
     *
     * @example
     * ```ts
     * const transfer = await client.transfers.create({
     *   amount: 6.9,
     *   currency: 'usd',
     *   destination_id: 'destination_id',
     *   origin_id: 'origin_id',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/transfers', { body, ...options });
    }
    /**
     * Retrieves a transfer by ID
     *
     * Required permissions:
     *
     * - `payout:transfer:read`
     *
     * @example
     * ```ts
     * const transfer = await client.transfers.retrieve(
     *   'ctt_xxxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/transfers/${id}`, options);
    }
    /**
     * Lists transfers
     *
     * Required permissions:
     *
     * - `payout:transfer:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const transferListResponse of client.transfers.list()) {
     *   // ...
     * }
     * ```
     */
    list(query = {}, options) {
        return this._client.getAPIList('/transfers', (pagination_1.CursorPage), { query, ...options });
    }
}
exports.Transfers = Transfers;
//# sourceMappingURL=transfers.js.map