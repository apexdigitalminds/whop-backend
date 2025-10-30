// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class ChatChannels extends APIResource {
    /**
     * Retrieves a chat channel
     *
     * Required permissions:
     *
     * - `chat:read`
     *
     * @example
     * ```ts
     * const chatChannel = await client.chatChannels.retrieve(
     *   'id',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get(path `/chat_channels/${id}`, options);
    }
    /**
     * Updates a chat channel
     *
     * Required permissions:
     *
     * - `chat:moderate`
     *
     * @example
     * ```ts
     * const chatChannel = await client.chatChannels.update('id');
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch(path `/chat_channels/${id}`, { body, ...options });
    }
    /**
     * Lists chat channels inside a company
     *
     * Required permissions:
     *
     * - `chat:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const chatChannelListResponse of client.chatChannels.list(
     *   { company_id: 'biz_xxxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/chat_channels', (CursorPage), {
            query,
            ...options,
        });
    }
}
//# sourceMappingURL=chat-channels.mjs.map