// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Transfers extends APIResource {
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
        return this._client.get(path `/transfers/${id}`, options);
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
        return this._client.getAPIList('/transfers', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=transfers.mjs.map