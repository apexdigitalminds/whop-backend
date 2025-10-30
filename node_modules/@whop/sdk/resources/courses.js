"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courses = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class Courses extends resource_1.APIResource {
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
        return this._client.get((0, path_1.path) `/courses/${id}`, options);
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
        return this._client.patch((0, path_1.path) `/courses/${id}`, { body, ...options });
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
        return this._client.getAPIList('/courses', (pagination_1.CursorPage), { query, ...options });
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
        return this._client.delete((0, path_1.path) `/courses/${id}`, options);
    }
}
exports.Courses = Courses;
//# sourceMappingURL=courses.js.map