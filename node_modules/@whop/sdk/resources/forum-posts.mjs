// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class ForumPosts extends APIResource {
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
        return this._client.get(path `/forum_posts/${id}`, options);
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
        return this._client.patch(path `/forum_posts/${id}`, { body, ...options });
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
        return this._client.getAPIList('/forum_posts', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=forum-posts.mjs.map