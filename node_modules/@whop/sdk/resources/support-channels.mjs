// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class SupportChannels extends APIResource {
    /**
     * Create a new support channel for a user in a company. If one already exists, it
     * will return the existing one.
     *
     * Required permissions:
     *
     * - `support_chat:create`
     *
     * @example
     * ```ts
     * const supportChannel = await client.supportChannels.create({
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     *   user_id: 'user_xxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/support_channels', { body, ...options });
    }
    /**
     * Retrieves a support channel
     *
     * Required permissions:
     *
     * - `support_chat:read`
     *
     * @example
     * ```ts
     * const supportChannel =
     *   await client.supportChannels.retrieve('id');
     * ```
     */
    retrieve(id, options) {
        return this._client.get(path `/support_channels/${id}`, options);
    }
    /**
     * Lists chat channels inside a company
     *
     * Required permissions:
     *
     * - `support_chat:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const supportChannelListResponse of client.supportChannels.list(
     *   { company_id: 'biz_xxxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/support_channels', (CursorPage), {
            query,
            ...options,
        });
    }
}
//# sourceMappingURL=support-channels.mjs.map