// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class CourseChapters extends APIResource {
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
        return this._client.get(path `/course_chapters/${id}`, options);
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
        return this._client.patch(path `/course_chapters/${id}`, { body, ...options });
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
        return this._client.getAPIList('/course_chapters', (CursorPage), {
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
        return this._client.delete(path `/course_chapters/${id}`, options);
    }
}
//# sourceMappingURL=course-chapters.mjs.map