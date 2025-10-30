"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumPosts = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class ForumPosts extends resource_1.APIResource {
    /**
     * Create a new forum post
     *
     * Required permissions:
     *
     * - `forum:post:create`
     *
     * @example
     * ```ts
     * const forumPost = await client.forumPosts.create({
     *   experience_id: 'exp_xxxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/forum_posts', { body, ...options });
    }
    /**
     * Retrieves a forum post by ID
     *
     * Required permissions:
     *
     * - `forum:read`
     *
     * @example
     * ```ts
     * const forumPost = await client.forumPosts.retrieve('id');
     * ```
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/forum_posts/${id}`, options);
    }
    /**
     * Update an existing forum post
     *
     * @example
     * ```ts
     * const forumPost = await client.forumPosts.update('id');
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch((0, path_1.path) `/forum_posts/${id}`, { body, ...options });
    }
    /**
     * Lists forum posts
     *
     * Required permissions:
     *
     * - `forum:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const forumPostListResponse of client.forumPosts.list(
     *   { experience_id: 'exp_xxxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/forum_posts', (pagination_1.CursorPage), { query, ...options });
    }
}
exports.ForumPosts = ForumPosts;
//# sourceMappingURL=forum-posts.js.map