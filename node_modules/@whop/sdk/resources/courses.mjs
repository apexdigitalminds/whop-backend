// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Courses extends APIResource {
    /**
     * Creates a new course module in an experience
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const course = await client.courses.create({
     *   experience_id: 'exp_xxxxxxxxxxxxxx',
     *   title: 'title',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/courses', { body, ...options });
    }
    /**
     * Retrieves a course by ID
     *
     * Required permissions:
     *
     * - `courses:read`
     *
     * @example
     * ```ts
     * const course = await client.courses.retrieve(
     *   'cors_xxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get(path `/courses/${id}`, options);
    }
    /**
     * Updates a course
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const course = await client.courses.update(
     *   'cors_xxxxxxxxxxxxx',
     * );
     * ```
     */
    update(id, body = {}, options) {
        return this._client.patch(path `/courses/${id}`, { body, ...options });
    }
    /**
     * Lists courses for an experience or company
     *
     * Required permissions:
     *
     * - `courses:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const courseListResponse of client.courses.list()) {
     *   // ...
     * }
     * ```
     */
    list(query = {}, options) {
        return this._client.getAPIList('/courses', (CursorPage), { query, ...options });
    }
    /**
     * Deletes a course
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const course = await client.courses.delete(
     *   'cors_xxxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id, options) {
        return this._client.delete(path `/courses/${id}`, options);
    }
}
//# sourceMappingURL=courses.mjs.map