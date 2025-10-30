"use strict";
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseChapters = void 0;
const resource_1 = require("../core/resource.js");
const pagination_1 = require("../core/pagination.js");
const path_1 = require("../internal/utils/path.js");
class CourseChapters extends resource_1.APIResource {
    /**
     * Creates a new course chapter
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.create({
     *   course_id: 'cors_xxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body, options) {
        return this._client.post('/course_chapters', { body, ...options });
    }
    /**
     * Retrieves a course chapter by ID
     *
     * Required permissions:
     *
     * - `courses:read`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.retrieve(
     *   'chap_xxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id, options) {
        return this._client.get((0, path_1.path) `/course_chapters/${id}`, options);
    }
    /**
     * Updates a course chapter
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.update(
     *   'chap_xxxxxxxxxxxxx',
     *   { title: 'title' },
     * );
     * ```
     */
    update(id, body, options) {
        return this._client.patch((0, path_1.path) `/course_chapters/${id}`, { body, ...options });
    }
    /**
     * Lists chapters for a course
     *
     * Required permissions:
     *
     * - `courses:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const courseChapterListResponse of client.courseChapters.list(
     *   { course_id: 'cors_xxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query, options) {
        return this._client.getAPIList('/course_chapters', (pagination_1.CursorPage), {
            query,
            ...options,
        });
    }
    /**
     * Deletes a course chapter
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.delete(
     *   'chap_xxxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id, options) {
        return this._client.delete((0, path_1.path) `/course_chapters/${id}`, options);
    }
}
exports.CourseChapters = CourseChapters;
//# sourceMappingURL=course-chapters.js.map