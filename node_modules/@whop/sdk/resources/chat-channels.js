"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatChannels = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class ChatChannels extends resource_1.APIResource {
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
        return this._client.get((0, path_1.path) `/chat_channels/${id}`, options);
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
        return this._client.patch((0, path_1.path) `/chat_channels/${id}`, { body, ...options });
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
        return this._client.getAPIList('/chat_channels', (pagination_1.CursorPage), {
            query,
            ...options,
        });
    }
}
exports.ChatChannels = ChatChannels;
//# sourceMappingURL=chat-channels.js.map