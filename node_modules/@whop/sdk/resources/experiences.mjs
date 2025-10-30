// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Experiences extends APIResource {
    /**
     * Required permissions:
     *
     * - `experience:create`
     *
     * @example
     * ```ts
     * const experience = await client.experiences.create({
     *   app_id: 'app_xxxxxxxxxxxxxx',
     *   company_id: 'biz_xxxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/experiences', { body, ...options });
    }
    /**
     * Retrieves an experience by ID
     *
     * @example
     * ```ts
     * const experience = await client.experiences.retrieve(
     *   'exp_xxxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get(path `/experiences/${id}`, options);
    }
    /**
     * Required permissions:
     *
     * - `experience:update`
     *
     * @example
     * ```ts
     * const experience = await client.experiences.update(
     *   'exp_xxxxxxxxxxxxxx',
     * );
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch(path `/experiences/${id}`, { body, ...options });
    }
    /**
     * Lists experiences for a company
     *
     * Required permissions:
     *
     * - `experience:hidden_experience:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const experienceListResponse of client.experiences.list(
     *   { company_id: 'biz_xxxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/experiences', (CursorPage), { query, ...options });
    }
    /**
     * Required permissions:
     *
     * - `experience:delete`
     *
     * @example
     * ```ts
     * const experience = await client.experiences.delete(
     *   'exp_xxxxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id, options) {
        return this._client.delete(path `/experiences/${id}`, options);
    }
    /**
     * Adds an experience to an product, making it accessible to the product's
     * customers.
     *
     * Required permissions:
     *
     * - `experience:attach`
     *
     * @example
     * ```ts
     * const experience = await client.experiences.attach(
     *   'exp_xxxxxxxxxxxxxx',
     *   { product_id: 'prod_xxxxxxxxxxxxx' },
     * );
     * ```
     */
    attach(id, body, options) {
        return this._client.post(path `/experiences/${id}/attach`, { body, ...options });
    }
    /**
     * Removes an experience from an product, making it inaccessible to the product's
     * customers.
     *
     * Required permissions:
     *
     * - `experience:detach`
     *
     * @example
     * ```ts
     * const experience = await client.experiences.detach(
     *   'exp_xxxxxxxxxxxxxx',
     *   { product_id: 'prod_xxxxxxxxxxxxx' },
     * );
     * ```
     */
    detach(id, body, options) {
        return this._client.post(path `/experiences/${id}/detach`, { body, ...options });
    }
    /**
     * Duplicates an existing experience. The name will be copied, unless provided. The
     * new experience will be attached to the same products as the original experience.
     * If duplicating a Forum or Chat experience, the new experience will have the same
     * settings as the original experience, e.g. who can post, who can comment, etc. No
     * content, e.g. posts, messages, lessons from within the original experience will
     * be copied.
     *
     * Required permissions:
     *
     * - `experience:create`
     *
     * @example
     * ```ts
     * const experience = await client.experiences.duplicate(
     *   'exp_xxxxxxxxxxxxxx',
     * );
     * ```
     */
    duplicate(id, body = {}, options) {
        return this._client.post(path `/experiences/${id}/duplicate`, { body, ...options });
    }
}
//# sourceMappingURL=experiences.mjs.map